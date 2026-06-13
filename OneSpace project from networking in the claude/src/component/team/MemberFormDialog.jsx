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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const COMMON_SKILLS = [
  "Copywriting", "SEO", "Social Media", "Design", "Video Editing",
  "Analytics", "Email Marketing", "Paid Ads", "Branding", "Content Strategy",
  "Photography", "UX Writing", "Community Management", "PR", "Influencer Marketing",
];

export default function MemberFormDialog({ open, onOpenChange, member, onSave, onDelete }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    availability: "available",
    max_capacity: 40,
    current_workload: 0,
    skills: [],
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || "",
        email: member.email || "",
        role: member.role || "",
        department: member.department || "",
        availability: member.availability || "available",
        max_capacity: member.max_capacity || 40,
        current_workload: member.current_workload || 0,
        skills: member.skills || [],
      });
    } else {
      setForm({
        name: "", email: "", role: "", department: "",
        availability: "available", max_capacity: 40, current_workload: 0, skills: [],
      });
    }
    setNewSkill("");
  }, [member, open]);

  const addSkill = (skillName) => {
    const name = skillName.trim();
    if (!name || form.skills.find((s) => s.name === name)) return;
    setForm({ ...form, skills: [...form.skills, { name, level: 5 }] });
    setNewSkill("");
  };

  const removeSkill = (name) => {
    setForm({ ...form, skills: form.skills.filter((s) => s.name !== name) });
  };

  const updateSkillLevel = (name, level) => {
    setForm({
      ...form,
      skills: form.skills.map((s) => (s.name === name ? { ...s, level: level[0] } : s)),
    });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const data = { ...form };
    if (!data.department) delete data.department;
    if (!data.role) delete data.role;
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Member" : "Add Member"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Email</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@company.com"
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Content Strategist"
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Department</Label>
              <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-zinc-400 text-xs">Availability</Label>
              <Select value={form.availability} onValueChange={(v) => setForm({ ...form, availability: v })}>
                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="overloaded">Overloaded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-zinc-400 text-xs">Max Capacity (hrs/week)</Label>
              <Input
                type="number"
                value={form.max_capacity}
                onChange={(e) => setForm({ ...form, max_capacity: Number(e.target.value) })}
                className="bg-zinc-800/50 border-zinc-700 mt-1"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label className="text-zinc-400 text-xs">Skills</Label>
            <div className="flex gap-2 mt-1.5 flex-wrap mb-2">
              {COMMON_SKILLS.filter((s) => !form.skills.find((sk) => sk.name === s))
                .slice(0, 6)
                .map((s) => (
                  <button
                    key={s}
                    onClick={() => addSkill(s)}
                    className="text-[10px] px-2 py-1 rounded-md bg-zinc-800/60 text-zinc-500 hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                placeholder="Custom skill..."
                className="bg-zinc-800/50 border-zinc-700 text-sm"
              />
              <Button size="sm" variant="outline" onClick={() => addSkill(newSkill)} className="border-zinc-700 text-zinc-300">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 space-y-2.5">
              {form.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3 bg-zinc-800/30 rounded-lg px-3 py-2">
                  <span className="text-xs text-zinc-300 min-w-[100px]">{skill.name}</span>
                  <Slider
                    value={[skill.level]}
                    onValueChange={(v) => updateSkillLevel(skill.name, v)}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-violet-400 font-medium w-6 text-right">{skill.level}</span>
                  <button onClick={() => removeSkill(skill.name)} className="text-zinc-600 hover:text-rose-400 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div>
            {member && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(member.id)}
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
            <Button onClick={handleSubmit} className="bg-violet-600 hover:bg-violet-700 text-white">
              {member ? "Update" : "Add Member"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}