import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const COLORS = {
  backlog: "#71717a",
  todo: "#a78bfa",
  in_progress: "#6366f1",
  review: "#f59e0b",
  done: "#10b981",
};

const LABELS = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-zinc-300">{payload[0].name}: <span className="font-semibold text-zinc-100">{payload[0].value}</span></p>
    </div>
  );
};

export default function TaskDistributionChart({ tasks }) {
  const data = Object.entries(
    tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: LABELS[key] || key, value, key }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-600 text-sm">
        No tasks yet
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-6">
        <div className="w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={COLORS[entry.key] || "#71717a"} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[entry.key] || "#71717a" }}
              />
              <span className="text-xs text-zinc-400">{entry.name}</span>
              <span className="text-xs font-medium text-zinc-300">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}