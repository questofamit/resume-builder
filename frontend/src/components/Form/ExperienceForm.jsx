/**
 * Work Experience Form Section
 */
import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, SectionCard, EntryCard, Button } from "../UI";

const blank = () => ({
  id:          `exp-${Date.now()}`,
  company:     "",
  position:    "",
  startDate:   "",
  endDate:     "",
  current:     false,
  description: "",
});

export default function ExperienceForm() {
  const { resume, setExperience } = useResume();
  const items = resume.experience;

  const add    = () => setExperience([...items, blank()]);
  const remove = (id) => setExperience(items.filter((e) => e.id !== id));
  const update = (id, field, value) =>
    setExperience(items.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <SectionCard
      title="Work Experience"
      icon="💼"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          + Add
        </Button>
      }
    >
      {items.length === 0 && (
        <p style={emptyStyle}>No experience added yet. Click "+ Add" to start.</p>
      )}

      {items.map((exp, i) => (
        <EntryCard key={exp.id} index={i} onRemove={() => remove(exp.id)}>
          <div style={grid2}>
            <Input
              label="Job Title / Position"
              value={exp.position}
              onChange={(e) => update(exp.id, "position", e.target.value)}
              placeholder="Senior Software Engineer"
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) => update(exp.id, "company", e.target.value)}
              placeholder="Stripe"
            />
            <Input
              label="Start Date"
              value={exp.startDate}
              onChange={(e) => update(exp.id, "startDate", e.target.value)}
              placeholder="Jan 2022"
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <Input
                label="End Date"
                value={exp.endDate}
                onChange={(e) => update(exp.id, "endDate", e.target.value)}
                placeholder="Dec 2023"
                disabled={exp.current}
              />
              <label style={checkLabel}>
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => update(exp.id, "current", e.target.checked)}
                  style={{ accentColor: "var(--blue)", width: 14, height: 14 }}
                />
                <span style={{ fontSize: 12, color: "var(--gray-500)" }}>Currently working here</span>
              </label>
            </div>
          </div>
          <Textarea
            label="Responsibilities & Achievements"
            value={exp.description}
            onChange={(e) => update(exp.id, "description", e.target.value)}
            placeholder={"Start each bullet on a new line:\nLed backend refactor reducing API latency by 40%\nMentored 3 junior engineers and improved team velocity"}
            rows={4}
            hint="One achievement per line — use numbers/metrics whenever possible."
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

const checkLabel = {
  display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
};

const emptyStyle = {
  fontSize: 13, color: "var(--gray-400)", textAlign: "center", padding: "12px 0",
};
