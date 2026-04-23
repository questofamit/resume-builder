/**
 * Template: Minimal
 * Ultra-clean typographic grid with subtle accent lines
 */
import React from "react";

export default function MinimalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div style={root}>
      {/* ── Name Block ─────────────────────────── */}
      <div style={topBlock}>
        <h1 style={nameText}>{personal.name || "Your Name"}</h1>
        <div style={accentBar} />
        <div style={contactGrid}>
          {personal.email    && <span style={contactItem}>{personal.email}</span>}
          {personal.phone    && <span style={contactItem}>{personal.phone}</span>}
          {personal.location && <span style={contactItem}>{personal.location}</span>}
          {personal.linkedin && <span style={contactItem}>{personal.linkedin}</span>}
          {personal.website  && <span style={contactItem}>{personal.website}</span>}
        </div>
        {personal.summary && <p style={summaryText}>{personal.summary}</p>}
      </div>

      {/* ── Main Content ───────────────────────── */}
      <div style={mainGrid}>
        {/* Left column: Experience + Projects */}
        <div style={leftCol}>
          {experience?.length > 0 && (
            <Block title="Experience">
              {experience.map((exp) => (
                <ExpItem key={exp.id || exp.company} exp={exp} />
              ))}
            </Block>
          )}
          {projects?.length > 0 && (
            <Block title="Projects">
              {projects.map((proj) => (
                <ProjItem key={proj.id || proj.name} proj={proj} />
              ))}
            </Block>
          )}
        </div>

        {/* Right column: Education + Skills */}
        <div style={rightCol}>
          {education?.length > 0 && (
            <Block title="Education">
              {education.map((edu) => (
                <EduItem key={edu.id || edu.institution} edu={edu} />
              ))}
            </Block>
          )}
          {skills?.length > 0 && (
            <Block title="Skills">
              <div style={skillsWrap}>
                {skills.map((s) => (
                  <span key={s} style={skillTag}>{s}</span>
                ))}
              </div>
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */
function Block({ title, children }) {
  return (
    <div style={blockWrap}>
      <div style={blockLabel}>{title}</div>
      <div style={blockBody}>{children}</div>
    </div>
  );
}

function ExpItem({ exp }) {
  const bullets = (exp.description || "").split("\n").filter(Boolean);
  return (
    <div style={itemWrap}>
      <div style={itemRow}>
        <div>
          <span style={itemTitle}>{exp.position}</span>
          {exp.company && <span style={itemAt}> at {exp.company}</span>}
        </div>
        <span style={itemDate}>
          {exp.startDate}{exp.startDate && " –"} {exp.current ? "Present" : exp.endDate}
        </span>
      </div>
      {bullets.map((b, i) => (
        <div key={i} style={bulletRow}>
          <span style={bulletDot}>—</span>
          <span style={bulletText}>{b}</span>
        </div>
      ))}
    </div>
  );
}

function EduItem({ edu }) {
  const degree = [edu.degree, edu.field].filter(Boolean).join(", ");
  return (
    <div style={itemWrap}>
      <div style={itemRow}>
        <span style={itemTitle}>{edu.institution}</span>
        <span style={itemDate}>{[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}</span>
      </div>
      <div style={itemAt}>{degree}</div>
      {edu.gpa && <div style={itemDate}>GPA {edu.gpa}</div>}
    </div>
  );
}

function ProjItem({ proj }) {
  return (
    <div style={itemWrap}>
      <div style={itemRow}>
        <span style={itemTitle}>{proj.name}</span>
        {proj.url && <span style={projUrl}>{proj.url}</span>}
      </div>
      {proj.technologies && <div style={techLine}>{proj.technologies}</div>}
      {proj.description  && <div style={bulletText}>{proj.description}</div>}
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */
const ACCENT = "#0066CC";

const root = {
  width: "100%", minHeight: "100%",
  fontFamily: "'DM Sans', sans-serif",
  background: "#fff", color: "#111",
  fontSize: 10, padding: "30px 32px",
  display: "flex", flexDirection: "column", gap: 20,
};

const topBlock = { display: "flex", flexDirection: "column", gap: 8 };

const nameText = {
  fontSize: 30, fontWeight: 300, letterSpacing: -1,
  color: "#0a0a0a", lineHeight: 1,
  fontFamily: "'DM Sans', sans-serif",
};

const accentBar = {
  width: 40, height: 3, background: ACCENT, borderRadius: 2,
};

const contactGrid = {
  display: "flex", flexWrap: "wrap", gap: "3px 16px",
};

const contactItem = {
  fontSize: 9, color: "#666",
};

const summaryText = {
  fontSize: 10, color: "#444", lineHeight: 1.65,
  maxWidth: "78%", paddingTop: 4,
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "1.7fr 1fr",
  gap: 24, alignItems: "start",
};

const leftCol  = { display: "flex", flexDirection: "column", gap: 16 };
const rightCol = { display: "flex", flexDirection: "column", gap: 16 };

const blockWrap = { display: "flex", flexDirection: "column", gap: 8 };
const blockLabel = {
  fontSize: 8, fontWeight: 700, letterSpacing: 2.5,
  textTransform: "uppercase", color: ACCENT,
  paddingBottom: 5, borderBottom: "1px solid #e5e5e5",
};
const blockBody = { display: "flex", flexDirection: "column", gap: 10 };

const itemWrap = { display: "flex", flexDirection: "column", gap: 3 };
const itemRow  = {
  display: "flex", justifyContent: "space-between",
  alignItems: "baseline", gap: 8,
};
const itemTitle = { fontSize: 10.5, fontWeight: 600, color: "#0a0a0a" };
const itemAt    = { fontSize: 9.5, color: "#555" };
const itemDate  = { fontSize: 8.5, color: "#999", whiteSpace: "nowrap" };

const bulletRow  = { display: "flex", gap: 5, alignItems: "flex-start", marginTop: 2 };
const bulletDot  = { fontSize: 9, color: ACCENT, flexShrink: 0, marginTop: .5, fontWeight: 700 };
const bulletText = { fontSize: 9.5, color: "#444", lineHeight: 1.55 };

const projUrl  = { fontSize: 8.5, color: ACCENT, fontStyle: "italic" };
const techLine = { fontSize: 9, color: "#888", fontStyle: "italic" };

const skillsWrap = { display: "flex", flexWrap: "wrap", gap: 4 };
const skillTag = {
  padding: "2px 8px",
  border: "1px solid #ddd",
  borderRadius: 3, fontSize: 9,
  color: "#333",
};
