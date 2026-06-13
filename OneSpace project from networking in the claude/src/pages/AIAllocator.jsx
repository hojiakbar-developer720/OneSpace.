import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Loader2, Check, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAllocator() {
  const [allocations, setAllocations] = useState(null);
  const [isAllocating, setIsAllocating] = useState(false);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date"),
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  const unassignedTasks = tasks.filter((t) => !t.assigned_to && t.status !== "done");

  const runAllocation = async () => {
    if (unassignedTasks.length === 0 || members.length === 0) return;
    setIsAllocating(true);
    setAllocations(null);
    setAppliedIds(new Set());

    const memberSummaries = members.map((m) => ({
      name: m.name,
      email: m.email,
      role: m.role,
      skills: (m.skills || []).map((s) => `${s.name} (${s.level}/10)`).join(", "),
      availability: m.availability,
      workload: `${m.current_workload || 0}h / ${m.max_capacity || 40}h`,
      department: m.department,
    }));

    const taskSummaries = unassignedTasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      category: t.category,
      priority: t.priority,
      skills_required: t.skills_required,
      estimated_hours: t.estimated_hours,
    }));

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an AI task allocator for a marketing team. Assign unassigned tasks to the most suitable team members based on their skills, workload, availability, and the task requirements.

TEAM MEMBERS:
${JSON.stringify(memberSummaries, null, 2)}

UNASSIGNED TASKS:
${JSON.stringify(taskSummaries, null, 2)}

For each task, choose the best team member and explain why in one sentence. Consider:
1. Skill match (most important)
2. Current workload/availability
3. Department relevance
4. Priority (urgent tasks should go to available members)`,
      response_json_schema: {
        type: "object",
        properties: {
          allocations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                task_id: { type: "string" },
                task_title: { type: "string" },
                assigned_to_email: { type: "string" },
                assigned_to_name: { type: "string" },
                reason: { type: "string" },
                confidence: { type: "string", enum: ["high", "medium", "low"] },
              },
            },
          },
        },
      },
    });

    setAllocations(result.allocations || []);
    setIsAllocating(false);
  };

  const applyMutation = useMutation({
    mutationFn: ({ taskId, email }) =>
      base44.entities.Task.update(taskId, { assigned_to: email }),
    onSuccess: (_, { taskId }) => {
      setAppliedIds((prev) => new Set([...prev, taskId]));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const applyAll = async () => {
    if (!allocations) return;
    for (const alloc of allocations) {
      if (!appliedIds.has(alloc.task_id)) {
        await base44.entities.Task.update(alloc.task_id, { assigned_to: alloc.assigned_to_email });
      }
    }
    setAppliedIds(new Set(allocations.map((a) => a.task_id)));
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const confidenceColors = {
    high: "bg-emerald-500/15 text-emerald-400",
    medium: "bg-amber-500/15 text-amber-400",
    low: "bg-rose-500/15 text-rose-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">AI Task Allocator</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Automatically assign tasks based on team skills and availability
        </p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Unassigned Tasks</p>
          <p className="text-3xl font-bold text-zinc-100 mt-2">{unassignedTasks.length}</p>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Available Members</p>
          <p className="text-3xl font-bold text-zinc-100 mt-2">
            {members.filter((m) => m.availability !== "away").length}
          </p>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 flex items-center justify-center">
          <Button
            onClick={runAllocation}
            disabled={isAllocating || unassignedTasks.length === 0 || members.length === 0}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-5 text-sm font-medium shadow-lg shadow-violet-500/20"
          >
            {isAllocating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run AI Allocation
              </>
            )}
          </Button>
        </div>
      </div>

      {unassignedTasks.length === 0 && (
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-12 text-center">
          <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-3" />
          <p className="text-zinc-400 text-sm">All tasks are assigned! No work needed here.</p>
        </div>
      )}

      {members.length === 0 && (
        <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-12 text-center">
          <p className="text-zinc-400 text-sm">Add team members first to use AI allocation.</p>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {allocations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-300">
                <Sparkles className="h-4 w-4 inline mr-1.5 text-violet-400" />
                AI Recommendations
              </h3>
              <Button
                size="sm"
                onClick={applyAll}
                disabled={allocations.every((a) => appliedIds.has(a.task_id))}
                className="bg-violet-600 hover:bg-violet-700 text-white text-xs"
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Apply All
              </Button>
            </div>

            {allocations.map((alloc, i) => (
              <motion.div
                key={alloc.task_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "bg-zinc-900/60 border rounded-xl p-4 transition-all",
                  appliedIds.has(alloc.task_id)
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-zinc-800/50"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-medium text-zinc-200">{alloc.task_title}</h4>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-md bg-violet-500/15 flex items-center justify-center">
                          <User className="h-3 w-3 text-violet-400" />
                        </div>
                        <span className="text-sm font-medium text-violet-300">{alloc.assigned_to_name}</span>
                      </div>
                      <Badge className={cn("text-[10px] border-0", confidenceColors[alloc.confidence])}>
                        {alloc.confidence} match
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1.5">{alloc.reason}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={appliedIds.has(alloc.task_id) ? "ghost" : "outline"}
                    disabled={appliedIds.has(alloc.task_id)}
                    onClick={() =>
                      applyMutation.mutate({
                        taskId: alloc.task_id,
                        email: alloc.assigned_to_email,
                      })
                    }
                    className={cn(
                      "shrink-0",
                      appliedIds.has(alloc.task_id)
                        ? "text-emerald-400"
                        : "border-zinc-700 text-zinc-300 hover:bg-violet-500/10 hover:text-violet-300"
                    )}
                  >
                    {appliedIds.has(alloc.task_id) ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" /> Applied
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}