/**
 * Template: Classic
 * Traditional single-column, serif typography, centered header
 */
import React from "react";

export default function ClassicTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div style={root}>
      {/* ── Header ─────────────────────────────────── */}
      <header style={header}>
        <h1 style={nameText}>{personal.name || "Your Name"}</h1>
        <div style={contactRow}>
          {[
            personal.email,
            personal.phone,
            personal.location,
            personal.linkedin,
            personal.website,
          ]
            .filter(Boolean)
            .map((item, i, arr) => (
              <React.Fragment key={i}>
                <span style={contactItem}>{item}</span>
                {i < arr.length - 1 && <span style={contactDot}>·</span>}
              </React.Fragment>
            ))}
        </div>
      </header>

      {/* ── Body ───────────────────────────────────── */}
      <div style={body}>
        {personal.summary && (
          <section style={sectionWrap}>
            <p style={summaryText}>{personal.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section style={sectionWrap}>
            <SectionHeading>Experience</SectionHeading>
            {experience.map((exp) => (
              <ExpBlock key={exp.id || exp.company} exp={exp} />
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section style={sectionWrap}>
            <SectionHeading>Education</SectionHeading>
            {education.map((edu) => (
              <EduBlock key={edu.id || edu.institution} edu={edu} />
            ))}
          </section>
        )}

        {skills?.length > 0 && (
          <section style={sectionWrap}>
            <SectionHeading>Skills</SectionHeading>
            <p style={skillLine}>
              {skills.join("  ·  ")}
            </p>
          </section>
        )}

        {projects?.length > 0 && (
          <section style={sectionWrap}>
            <SectionHeading>Projects</SectionHeading>
            {projects.map((proj) => (
              <ProjBlock key={proj.id || proj.name} proj={proj} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */
function SectionHeading({ children }) {
  return (
    <div style={headWrap}>
      <h2 style={headText}>{children.toUpperCase()}</h2>
      <div style={headRule} />
    </div>
  );
}

function ExpBlock({ exp }) {
  const bullets = (exp.description || "").split("\n").filter(Boolean);
  return (
    <div style={entryWrap}>
      <div style={entryHeader}>
        <div>
          <span style={entryTitle}>{exp.position}</span>
          <span style={entrySep}>,&nbsp;</span>
          <span style={entrySubtitle}>{exp.company}</span>
        </div>
        <span style={entryDate}>
          {exp.startDate}{exp.startDate ? " – " : ""}{exp.current ? "Present" : exp.endDate}
        </span>
      </div>
      {bullets.length > 0 && (
        <ul style={bulletList}>
          {bullets.map((b, i) => (
            <li key={i} style={bulletItem}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EduBlock({ edu }) {
  const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
  return (
    <div style={entryWrap}>
      <div style={entryHeader}>
        <div>
          <span style={entryTitle}>{degree}</span>
          <span style={entrySep}>,&nbsp;</span>
          <span style={entrySubtitle}>{edu.institution}</span>
          {edu.gpa && <span style={gpaTag}>&nbsp;· GPA {edu.gpa}</span>}
        </div>
        <span style={entryDate}>
          {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
        </span>
      </div>
    </div>
  );
}

function ProjBlock({ proj }) {
  return (
    <div style={entryWrap}>
      <div style={entryHeader}>
        <div>
          <span style={entryTitle}>{proj.name}</span>
          {proj.technologies && <span style={techText}>&ensp;{proj.technologies}</span>}
        </div>
        {proj.url && <span style={urlText}>{proj.url}</span>}
      </div>
      {proj.description && <p style={projDesc}>{proj.description}</p>}
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */
const ACCENT = "#8B0000"; // classic deep red

const root = {
  width: "100%", minHeight: "100%",
  fontFamily: "'Lora', Georgia, serif",
  background: "#fff", color: "#1a1a1a",
  fontSize: 10, padding: "32px 36px",
};

const header = {
  textAlign: "center", borderBottom: `2px solid ${ACCENT}`,
  paddingBottom: 14, marginBottom: 18,
};

const nameText = {
  fontSize: 26, fontWeight: 700, letterSpacing: ".5px",
  color: "#1a1a1a", fontFamily: "'Lora', Georgia, serif",
  marginBottom: 8,
};

const contactRow = {
  display: "flex", flexWrap: "wrap", justifyContent: "center",
  gap: 3, alignItems: "center",
};
const contactItem = { fontSize: 9, color: "#555" };
const contactDot  = { fontSize: 9, color: "#bbb", padding: "0 2px" };

const body = { display: "flex", flexDirection: "column", gap: 14 };

const summaryText = {
  fontSize: 10, color: "#444", lineHeight: 1.7,
  fontStyle: "italic", textAlign: "center",
  padding: "0 12px", borderLeft: `3px solid ${ACCENT}`,
  paddingLeft: 14, textAlign: "left",
};

const sectionWrap = { display: "flex", flexDirection: "column", gap: 8 };

const headWrap = { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 };
const headText = {
  fontSize: 9.5, fontWeight: 700, letterSpacing: 1.8,
  color: ACCENT, whiteSpace: "nowrap",
  fontFamily: "'DM Sans', sans-serif",
};
const headRule = { flex: 1, height: 1, background: "#ddd" };

const entryWrap = { marginBottom: 6 };
const entryHeader = {
  display: "flex", justifyContent: "space-between",
  alignItems: "baseline", gap: 8,
};
const entryTitle    = { fontSize: 10.5, fontWeight: 700, color: "#1a1a1a" };
const entrySep      = { fontSize: 10, color: "#999" };
const entrySubtitle = { fontSize: 10, fontStyle: "italic", color: "#555" };
const entryDate     = {
  fontSize: 9, color: "#888", whiteSpace: "nowrap",
  fontFamily: "'DM Sans', sans-serif",
};
const gpaTag  = { fontSize: 9, color: "#888" };
const techText = { fontSize: 9, fontStyle: "italic", color: "#888" };
const urlText  = { fontSize: 9, color: ACCENT, fontStyle: "italic" };

const bulletList = {
  paddingLeft: 14, marginTop: 4,
  display: "flex", flexDirection: "column", gap: 2,
};
const bulletItem = {
  fontSize: 9.5, color: "#444", lineHeight: 1.55,
  fontFamily: "'DM Sans', sans-serif",
};
const projDesc = {
  fontSize: 9.5, color: "#444", lineHeight: 1.55, marginTop: 4,
  fontFamily: "'DM Sans', sans-serif",
};
const skillLine = {
  fontSize: 9.5, color: "#444", lineHeight: 1.7,
  fontFamily: "'DM Sans', sans-serif",
};
