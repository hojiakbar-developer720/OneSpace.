import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

const CATEGORIES = [
  { value: "content", label: "Content" },
  { value: "design", label: "Design" },
  { value: "social_media", label: "Social Media" },
  { value: "seo", label: "SEO" },
  { value: "analytics", label: "Analytics" },
  { value: "email", label: "Email" },
  { value: "ads", label: "Ads" },
  { value: "branding", label: "Branding" },
  { value: "video", label: "Video" },
  { value: "strategy", label: "Strategy" },
];

const STATUSES = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

export default function TaskFormDialog({ open, onOpenChange, task, members, onSave, onDelete }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "backlog",
    priority: "medium",
    category: "",
    assigned_to: "",
    due_date: "",
    estimated_hours: "",
    skills_required: [],
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "backlog",
        priority: task.priority || "medium",
        category: task.category || "",
        assigned_to: task.assigned_to || "",
        due_date: task.due_date || "",
        estimated_hours: task.estimated_hours || "",
        skills_required: task.skills_required || [],
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "backlog",
        priority: "medium",
        category: "",
        assigned_to: "",
        due_date: "",
        estimated_hours: "",
        skills_required: [],
      });
    }
  }, [task, open]);

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const data = { ...form };
    if (data.estimated_hours) data.estimated_hours = Number(data.estimated_hours);
    else delete data.estimated_hours;
    if (!data.category) delete data.category;
    if (!data.assigned_to) delete data.assigned_to;
    if (!data.due_date) delete data.due_date;
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="text-zinc-400 text-xs">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Task title..."
              className="bg-zinc-800/50 border-zinc-700 mt-1"
            />
          </div>

          <div>
            <Label className="text-zinc-400 text-xs">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What needs to be done..."
              className="bg-zinc-800/50 border-zinc-700 mt-1 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Priority</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Assign To</Label>
              <Select value={form.assigned_to} onValueChange={(v) => setForm({ ...form, assigned_to: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {(members || []).map((m) => (
                    <SelectItem key={m.email} value={m.email}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Due Date</Label>
              <Input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Est. Hours</Label>
              <Input
                type="number"
                value={form.estimated_hours}
                onChange={(e) => setForm({ ...form, estimated_hours: e.target.value })}
                placeholder="0"
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div>
            {task && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-700 text-zinc-300">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {task ? "Update" : "Create"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}