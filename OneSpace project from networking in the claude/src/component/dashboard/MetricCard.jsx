import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, accentColor = "violet" }) {
  const colorMap = {
    violet: "from-violet-500/15 to-violet-600/5 border-violet-500/10 text-violet-400",
    emerald: "from-emerald-500/15 to-emerald-600/5 border-emerald-500/10 text-emerald-400",
    amber: "from-amber-500/15 to-amber-600/5 border-amber-500/10 text-amber-400",
    rose: "from-rose-500/15 to-rose-600/5 border-rose-500/10 text-rose-400",
    sky: "from-sky-500/15 to-sky-600/5 border-sky-500/10 text-sky-400",
  };

  const iconBg = {
    violet: "bg-violet-500/15 text-violet-400",
    emerald: "bg-emerald-500/15 text-emerald-400",
    amber: "bg-amber-500/15 text-amber-400",
    rose: "bg-rose-500/15 text-rose-400",
    sky: "bg-sky-500/15 text-sky-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl bg-gradient-to-br border p-5",
        colorMap[accentColor]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-zinc-100 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
        </div>
        <div className={cn("p-2.5 rounded-xl", iconBg[accentColor])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={cn("text-xs font-medium", trend > 0 ? "text-emerald-400" : "text-rose-400")}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
          <span className="text-xs text-zinc-600">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}