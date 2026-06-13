import React from "react";
import { cn } from "@/lib/utils";

export default function WorkloadBar({ member }) {
  const capacity = member.max_capacity || 40;
  const workload = member.current_workload || 0;
  const percentage = Math.min((workload / capacity) * 100, 100);

  const getColor = () => {
    if (percentage >= 90) return "bg-rose-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-violet-500";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
          {member.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-zinc-300 truncate">{member.name}</p>
            <p className="text-xs text-zinc-500 shrink-0 ml-2">{workload}h / {capacity}h</p>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", getColor())}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}