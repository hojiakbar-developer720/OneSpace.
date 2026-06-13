import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SkillHeatmap({ members }) {
  if (!members?.length) return null;

  const allSkills = new Set();
  members.forEach((m) => (m.skills || []).forEach((s) => allSkills.add(s.name)));
  const skillNames = Array.from(allSkills).sort();

  const getColor = (level) => {
    if (!level || level === 0) return "bg-zinc-800/40";
    if (level <= 2) return "bg-violet-500/15";
    if (level <= 4) return "bg-violet-500/30";
    if (level <= 6) return "bg-violet-500/50";
    if (level <= 8) return "bg-violet-500/70";
    return "bg-violet-500/90";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-zinc-500 pb-3 pr-4 min-w-[120px]">Member</th>
            {skillNames.map((skill) => (
              <th key={skill} className="text-center text-[10px] font-medium text-zinc-500 pb-3 px-1">
                <div className="writing-mode-vertical -rotate-45 origin-center whitespace-nowrap">
                  {skill}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, mi) => (
            <tr key={member.id}>
              <td className="text-xs font-medium text-zinc-300 py-1.5 pr-4">
                {member.name}
              </td>
              {skillNames.map((skill) => {
                const found = (member.skills || []).find((s) => s.name === skill);
                const level = found?.level || 0;
                return (
                  <td key={skill} className="px-1 py-1.5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: mi * 0.03 }}
                      className={cn(
                        "h-7 w-7 rounded-md mx-auto flex items-center justify-center text-[10px] font-medium transition-all",
                        getColor(level),
                        level > 0 ? "text-zinc-200" : "text-zinc-700"
                      )}
                      title={`${member.name}: ${skill} - Level ${level}`}
                    >
                      {level > 0 ? level : ""}
                    </motion.div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}