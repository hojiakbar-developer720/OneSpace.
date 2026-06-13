import React from "react";
import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";

const columnConfig = {
  backlog: { label: "Backlog", dot: "bg-zinc-500" },
  todo: { label: "To Do", dot: "bg-violet-400" },
  in_progress: { label: "In Progress", dot: "bg-indigo-400" },
  review: { label: "Review", dot: "bg-amber-400" },
  done: { label: "Done", dot: "bg-emerald-400" },
};

export default function BoardColumn({ status, tasks, onTaskClick, onAddTask }) {
  const config = columnConfig[status] || { label: status, dot: "bg-zinc-500" };

  return (
    <div className="flex flex-col min-w-[280px] w-[280px] shrink-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", config.dot)} />
          <h3 className="text-sm font-semibold text-zinc-300">{config.label}</h3>
          <span className="text-xs text-zinc-600 font-medium">{tasks.length}</span>
        </div>
        <button
          onClick={() => onAddTask?.(status)}
          className="p-1 rounded-md hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 space-y-2.5 p-1 rounded-xl min-h-[200px] transition-colors duration-200",
              snapshot.isDraggingOver && "bg-violet-500/5 ring-1 ring-violet-500/10 rounded-xl"
            )}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided) => (
                  <TaskCard
                    task={task}
                    onClick={onTaskClick}
                    provided={dragProvided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}