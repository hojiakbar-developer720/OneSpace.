import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MemberCard from "../components/team/MemberCard";
import MemberFormDialog from "../components/team/MemberFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Team() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.TeamMember.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.TeamMember.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TeamMember.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setDialogOpen(false);
      setSelectedMember(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.TeamMember.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setDialogOpen(false);
      setSelectedMember(null);
    },
  });

  const handleSave = (data) => {
    if (selectedMember) {
      updateMutation.mutate({ id: selectedMember.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const filtered = members.filter(
    (m) =>
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.role?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Team</h1>
          <p className="text-sm text-zinc-500 mt-1">{members.length} members</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 bg-zinc-900/60 border-zinc-800 text-sm"
            />
          </div>
          <Button
            onClick={() => {
              setSelectedMember(null);
              setDialogOpen(true);
            }}
            className="bg-violet-600 hover:bg-violet-700 text-white shrink-0"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
            onClick={handleMemberClick}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500 text-sm">
            {search ? "No members match your search" : "No team members yet. Add your first one!"}
          </p>
        </div>
      )}

      <MemberFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        member={selectedMember}
        onSave={handleSave}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}