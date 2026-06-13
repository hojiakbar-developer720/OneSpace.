import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardColumn from "../components/board/BoardColumn";
import TaskFormDialog from "../components/board/TaskFormDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const COLUMNS = ["backlog", "todo", "in_progress", "review", "done"];

export default function Board() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("backlog");
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date"),
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Task.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDialogOpen(false);
      setSelectedTask(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Task.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDialogOpen(false);
      setSelectedTask(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Task.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDialogOpen(false);
      setSelectedTask(null);
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;
    updateMutation.mutate({ id: taskId, data: { status: newStatus } });
  };

  const handleSave = (data) => {
    if (selectedTask) {
      updateMutation.mutate({ id: selectedTask.id, data });
    } else {
      createMutation.mutate({ ...data, status: data.status || defaultStatus });
    }
  };

  const handleAddTask = (status) => {
    setSelectedTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const filtered = tasks.filter(
    (t) =>
      !search ||
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Board</h1>
          <p className="text-sm text-zinc-500 mt-1">Drag & drop tasks between columns</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 bg-zinc-900/60 border-zinc-800 text-sm"
          />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {COLUMNS.map((status) => (
            <BoardColumn
              key={status}
              status={status}
              tasks={filtered.filter((t) => t.status === status)}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        members={members}
        onSave={handleSave}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}