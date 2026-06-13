import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#8b5cf6", "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function SkillRadar({ members }) {
  if (!members?.length) return null;

  // Collect all unique skills
  const allSkills = new Set();
  members.forEach((m) => {
    (m.skills || []).forEach((s) => allSkills.add(s.name));
  });
  const skillNames = Array.from(allSkills);

  // Build chart data
  const data = skillNames.map((skill) => {
    const point = { skill };
    members.forEach((m) => {
      const found = (m.skills || []).find((s) => s.name === skill);
      point[m.name] = found ? found.level : 0;
    });
    return point;
  });

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "#71717a", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 10]}
            tick={{ fill: "#3f3f46", fontSize: 10 }}
            axisLine={false}
          />
          {members.map((m, i) => (
            <Radar
              key={m.id}
              name={m.name}
              dataKey={m.name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}