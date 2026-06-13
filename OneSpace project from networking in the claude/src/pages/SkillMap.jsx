import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import SkillRadar from "../components/skillmap/SkillRadar";
import SkillHeatmap from "../components/skillmap/SkillHeatmap";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function SkillMap() {
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  const hasSkills = members.some((m) => m.skills?.length > 0);

  // Compute team skill averages
  const skillAverages = (() => {
    const map = {};
    members.forEach((m) =>
      (m.skills || []).forEach((s) => {
        if (!map[s.name]) map[s.name] = { total: 0, count: 0 };
        map[s.name].total += s.level;
        map[s.name].count += 1;
      })
    );
    return Object.entries(map)
      .map(([name, { total, count }]) => ({ name, avg: +(total / count).toFixed(1), count }))
      .sort((a, b) => b.avg - a.avg);
  })();

  // Identify skill gaps (skills with avg < 5 or low coverage)
  const skillGaps = skillAverages.filter(
    (s) => s.avg < 5 || s.count < members.length * 0.3
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Skill Map</h1>
        <p className="text-sm text-zinc-500 mt-1">Visualize your team's capabilities</p>
      </div>

      {!hasSkills ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-12 text-center"
        >
          <p className="text-zinc-500 text-sm">
            No skill data yet. Add skills to team members on the{" "}
            <a href={`#`} className="text-violet-400 hover:underline">Team page</a>.
          </p>
        </motion.div>
      ) : (
        <>
          <Tabs defaultValue="radar" className="w-full">
            <TabsList className="bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="radar">Radar Chart</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            </TabsList>

            <TabsContent value="radar" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
              >
                <SkillRadar members={members.filter((m) => m.skills?.length > 0)} />
              </motion.div>
            </TabsContent>

            <TabsContent value="heatmap" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
              >
                <SkillHeatmap members={members} />
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Skills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">Top Team Skills</h3>
              <div className="space-y-3">
                {skillAverages.slice(0, 8).map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400 min-w-[100px]">{s.name}</span>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700"
                        style={{ width: `${(s.avg / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-violet-400 font-medium w-8 text-right">{s.avg}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skill Gaps */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">Skill Gaps</h3>
              {skillGaps.length === 0 ? (
                <p className="text-xs text-zinc-600">No significant gaps identified</p>
              ) : (
                <div className="space-y-3">
                  {skillGaps.map((s) => (
                    <div key={s.name} className="flex items-center justify-between py-1.5 border-b border-zinc-800/50 last:border-0">
                      <div>
                        <p className="text-xs font-medium text-zinc-300">{s.name}</p>
                        <p className="text-[10px] text-zinc-600">
                          {s.count} of {members.length} members • Avg: {s.avg}/10
                        </p>
                      </div>
                      <div className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-medium">
                        {s.avg < 3 ? "Critical" : s.avg < 5 ? "Moderate" : "Low Coverage"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}