import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const availabilityConfig = {
  available: { color: "bg-emerald-500", label: "Available" },
  busy: { color: "bg-amber-500", label: "Busy" },
  away: { color: "bg-zinc-500", label: "Away" },
  overloaded: { color: "bg-rose-500", label: "Overloaded" },
};

const departmentColors = {
  content: "bg-blue-500/15 text-blue-400",
  design: "bg-pink-500/15 text-pink-400",
  growth: "bg-emerald-500/15 text-emerald-400",
  analytics: "bg-amber-500/15 text-amber-400",
  leadership: "bg-violet-500/15 text-violet-400",
};

export default function MemberCard({ member, index, onClick }) {
  const availability = availabilityConfig[member.availability] || availabilityConfig.available;
  const capacity = member.max_capacity || 40;
  const workload = member.current_workload || 0;
  const workloadPct = Math.min((workload / capacity) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onClick?.(member)}
      className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 hover:border-zinc-700/50 hover:bg-zinc-800/40 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start gap-3.5">
        <div className="relative">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-sm font-bold text-violet-300">
            {member.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-900", availability.color)} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors truncate">
            {member.name}
          </h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
            <Briefcase className="h-3 w-3" />
            {member.role || "Team Member"}
          </p>
        </div>
        {member.department && (
          <Badge className={cn("text-[10px] border-0 font-medium shrink-0", departmentColors[member.department] || "bg-zinc-700 text-zinc-300")}>
            {member.department}
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Workload</span>
          <span className="text-[10px] text-zinc-400 font-medium">{workload}h / {capacity}h</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              workloadPct >= 90 ? "bg-rose-500" : workloadPct >= 70 ? "bg-amber-500" : "bg-violet-500"
            )}
            style={{ width: `${workloadPct}%` }}
          />
        </div>
      </div>

      {member.skills?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {member.skills.slice(0, 4).map((s) => (
            <span
              key={s.name}
              className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500"
            >
              {s.name}
            </span>
          ))}
          {member.skills.length > 4 && (
            <span className="text-[10px] text-zinc-600">+{member.skills.length - 4}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}