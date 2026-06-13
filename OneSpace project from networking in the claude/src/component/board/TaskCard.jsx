import React from "react";
import { cn } from "@/lib/utils";
import { Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

const priorityConfig = {
  low: { color: "bg-zinc-500/20 text-zinc-400", label: "Low" },
  medium: { color: "bg-violet-500/20 text-violet-400", label: "Med" },
  high: { color: "bg-amber-500/20 text-amber-400", label: "High" },
  urgent: { color: "bg-rose-500/20 text-rose-400", label: "Urgent" },
};

const categoryLabels = {
  content: "Content",
  design: "Design",
  social_media: "Social",
  seo: "SEO",
  analytics: "Analytics",
  email: "Email",
  ads: "Ads",
  branding: "Brand",
  video: "Video",
  strategy: "Strategy",
};

export default function TaskCard({ task, onClick, provided }) {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
      onClick={() => onClick?.(task)}
      className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-4 cursor-pointer hover:border-zinc-700/60 hover:bg-zinc-800/50 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <h4 className="text-sm font-medium text-zinc-200 leading-snug group-hover:text-zinc-100 transition-colors">
          {task.title}
        </h4>
        <Badge className={cn("text-[10px] px-1.5 py-0 shrink-0 border-0 font-medium", priority.color)}>
          {priority.label}
        </Badge>
      </div>

      {task.description && (
        <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{task.description}</p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {task.category && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-medium">
            {categoryLabels[task.category] || task.category}
          </span>
        )}
        {task.due_date && (
          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {format(new Date(task.due_date), "MMM d")}
          </span>
        )}
      </div>

      {task.assigned_to && (
        <div className="mt-3 flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-md bg-violet-500/15 flex items-center justify-center">
            <User className="h-3 w-3 text-violet-400" />
          </div>
          <span className="text-[10px] text-zinc-500 truncate">{task.assigned_to}</span>
        </div>
      )}
    </div>
  );
}