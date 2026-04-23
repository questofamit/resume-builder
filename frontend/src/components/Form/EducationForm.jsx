/**
 * Education Form Section
 */
import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Input, SectionCard, EntryCard, Button } from "../UI";

const blank = () => ({
  id:          `edu-${Date.now()}`,
  institution: "",
  degree:      "",
  field:       "",
  startDate:   "",
  endDate:     "",
  gpa:         "",
});

export default function EducationForm() {
  const { resume, setEducation } = useResume();
  const items = resume.education;

  const add    = () => setEducation([...items, blank()]);
  const remove = (id) => setEducation(items.filter((e) => e.id !== id));
  const update = (id, field, value) =>
    setEducation(items.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <SectionCard
      title="Education"
      icon="🎓"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          + Add
        </Button>
      }
    >
      {items.length === 0 && (
        <p style={emptyStyle}>No education added yet. Click "+ Add" to start.</p>
      )}

      {items.map((edu, i) => (
        <EntryCard key={edu.id} index={i} onRemove={() => remove(edu.id)}>
          <div style={grid2}>
            <Input
              label="Institution"
              value={edu.institution}
              onChange={(e) => update(edu.id, "institution", e.target.value)}
              placeholder="UC Berkeley"
            />
            <Input
              label="Degree"
              value={edu.degree}
              onChange={(e) => update(edu.id, "degree", e.target.value)}
              placeholder="Bachelor of Science"
            />
            <Input
              label="Field of Study"
              value={edu.field}
              onChange={(e) => update(edu.id, "field", e.target.value)}
              placeholder="Computer Science"
            />
            <Input
              label="GPA (optional)"
              value={edu.gpa}
              onChange={(e) => update(edu.id, "gpa", e.target.value)}
              placeholder="3.8"
            />
            <Input
              label="Start Date"
              value={edu.startDate}
              onChange={(e) => update(edu.id, "startDate", e.target.value)}
              placeholder="Aug 2015"
            />
            <Input
              label="End Date"
              value={edu.endDate}
              onChange={(e) => update(edu.id, "endDate", e.target.value)}
              placeholder="May 2019 (or leave blank if current)"
            />
          </div>
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
