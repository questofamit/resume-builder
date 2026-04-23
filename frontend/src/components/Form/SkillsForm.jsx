/**
 * Skills Form Section
 * Tag-based skill input with keyboard support
 */
import React, { useState, useRef } from "react";
import { useResume } from "../../context/ResumeContext";
import { SectionCard, Badge } from "../UI";

export default function SkillsForm() {
  const { resume, setSkills } = useResume();
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const addSkill = (raw) => {
    const skill = raw.trim();
    if (skill && !resume.skills.includes(skill)) {
      setSkills([...resume.skills, skill]);
    }
    setInput("");
  };

  const removeSkill = (skill) => {
    setSkills(resume.skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
    if (e.key === "Backspace" && input === "" && resume.skills.length) {
      removeSkill(resume.skills[resume.skills.length - 1]);
    }
  };

  return (
    <SectionCard title="Skills" icon="⚡">
      {/* Tag container — clicking focuses the input */}
      <div
        style={tagContainer}
        onClick={() => inputRef.current?.focus()}
      >
        {resume.skills.map((skill) => (
          <Badge key={skill} onRemove={() => removeSkill(skill)}>
            {skill}
          </Badge>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addSkill(input)}
          placeholder={resume.skills.length ? "" : "Type a skill and press Enter…"}
          style={tagInput}
          aria-label="Add skill"
        />
      </div>
      <p style={{ fontSize: 11, color: "var(--gray-400)" }}>
        Press <strong>Enter</strong> or <strong>,</strong> to add · <strong>Backspace</strong> to remove last
      </p>

      {/* Quick-add common skills */}
      <div>
        <p style={{ fontSize: 11, color: "var(--gray-500)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px" }}>
          Quick-add
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {COMMON_SKILLS.filter((s) => !resume.skills.includes(s)).slice(0, 12).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSkills([...resume.skills, s])}
              style={quickBtn}
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust",
  "React", "Vue.js", "Angular", "Node.js", "Express", "FastAPI",
  "PostgreSQL", "MongoDB", "Redis", "MySQL",
  "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform",
  "GraphQL", "REST API", "Git", "CI/CD", "Figma", "Agile",
];

const tagContainer = {
  display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
  minHeight: 46, padding: "8px 12px",
  border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)",
  background: "var(--white)", cursor: "text",
  transition: "border-color var(--dur)",
};

const tagInput = {
  border: "none", outline: "none", background: "transparent",
  fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--ink)",
  minWidth: 140, flex: 1,
};

const quickBtn = {
  padding: "3px 10px", border: "1px solid var(--gray-200)",
  borderRadius: "var(--r-full)", fontSize: 11, fontWeight: 500,
  color: "var(--gray-500)", background: "var(--gray-50)", cursor: "pointer",
  transition: "all var(--dur)", fontFamily: "var(--font-ui)",
};
