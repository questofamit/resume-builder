/**
 * Projects Form Section
 */
import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, SectionCard, EntryCard, Button } from "../UI";

const blank = () => ({
  id:           `proj-${Date.now()}`,
  name:         "",
  description:  "",
  technologies: "",
  url:          "",
});

export default function ProjectsForm() {
  const { resume, setProjects } = useResume();
  const items = resume.projects;

  const add    = () => setProjects([...items, blank()]);
  const remove = (id) => setProjects(items.filter((p) => p.id !== id));
  const update = (id, field, value) =>
    setProjects(items.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  return (
    <SectionCard
      title="Projects"
      icon="🚀"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          + Add
        </Button>
      }
    >
      {items.length === 0 && (
        <p style={emptyStyle}>No projects added yet. Click "+ Add" to start.</p>
      )}

      {items.map((proj, i) => (
        <EntryCard key={proj.id} index={i} onRemove={() => remove(proj.id)}>
          <div style={grid2}>
            <Input
              label="Project Name"
              value={proj.name}
              onChange={(e) => update(proj.id, "name", e.target.value)}
              placeholder="OpenMetrics Dashboard"
            />
            <Input
              label="Technologies Used"
              value={proj.technologies}
              onChange={(e) => update(proj.id, "technologies", e.target.value)}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>
          <Textarea
            label="Description"
            value={proj.description}
            onChange={(e) => update(proj.id, "description", e.target.value)}
            placeholder="Describe what you built, the impact, and key challenges solved…"
            rows={3}
          />
          <Input
            label="Project URL (optional)"
            value={proj.url}
            onChange={(e) => update(proj.id, "url", e.target.value)}
            placeholder="github.com/yourname/project"
          />
        </EntryCard>
      ))}
    </SectionCard>
  );
}

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};
const emptyStyle = {
  fontSize: 13, color: "var(--gray-400)", textAlign: "center", padding: "12px 0",
};
