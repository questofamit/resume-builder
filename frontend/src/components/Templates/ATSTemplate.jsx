/**
 * Template: ATS Friendly
 * Single column, no sidebar, plain text, simple fonts
 * 100% readable by Applicant Tracking Systems
 */
import React from "react";

export default function ATSTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div style={root}>

      {/* ── Name & Contact ─────────────────────────────── */}
      <div style={header}>
        <h1 style={name}>{personal.name || "Your Name"}</h1>
        <div style={contactRow}>
          {[personal.email, personal.phone, personal.location, personal.linkedin, personal.website]
            .filter(Boolean)
            .join("  |  ")}
        </div>
      </div>

      {/* ── Summary ───────────────────────────────────── */}
      {personal.summary && (
        <div style={section}>
          <h2 style={sectionTitle}>PROFESSIONAL SUMMARY</h2>
          <div style={rule} />
          <p style={summaryText}>{personal.summary}</p>
        </div>
      )}

      {/* ── Experience ────────────────────────────────── */}
      {experience?.length > 0 && (
        <div style={section}>
          <h2 style={sectionTitle}>WORK EXPERIENCE</h2>
          <div style={rule} />
          {experience.map((exp) => (
            <div key={exp.id || exp.company} style={entry}>
              <div style={entryHeader}>
                <span style={entryTitle}>{exp.position}</span>
                <span style={entryDate}>
                  {exp.startDate}{exp.startDate ? " - " : ""}{exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <div style={entryCompany}>{exp.company}</div>
              {exp.description && (
                <ul style={bulletList}>
                  {exp.description.split("\n").filter(Boolean).map((b, i) => (
                    <li key={i} style={bulletItem}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ─────────────────────────────────── */}
      {education?.length > 0 && (
        <div style={section}>
          <h2 style={sectionTitle}>EDUCATION</h2>
          <div style={rule} />
          {education.map((edu) => (
            <div key={edu.id || edu.institution} style={entry}>
              <div style={entryHeader}>
                <span style={entryTitle}>
                  {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                </span>
                <span style={entryDate}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
                </span>
              </div>
              <div style={entryCompany}>
                {edu.institution}{edu.gpa ? `  |  GPA: ${edu.gpa}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Skills ────────────────────────────────────── */}
      {skills?.length > 0 && (
        <div style={section}>
          <h2 style={sectionTitle}>SKILLS</h2>
          <div style={rule} />
          <p style={skillsText}>{skills.join("  |  ")}</p>
        </div>
      )}

      {/* ── Projects ──────────────────────────────────── */}
      {projects?.length > 0 && (
        <div style={section}>
          <h2 style={sectionTitle}>PROJECTS</h2>
          <div style={rule} />
          {projects.map((proj) => (
            <div key={proj.id || proj.name} style={entry}>
              <div style={entryHeader}>
                <span style={entryTitle}>{proj.name}</span>
                {proj.url && <span style={entryDate}>{proj.url}</span>}
              </div>
              {proj.technologies && (
                <div style={entryCompany}>Technologies: {proj.technologies}</div>
              )}
              {proj.description && (
                <p style={bulletItem}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/* ── Styles — Plain & Simple for ATS ──────────────────────────── */
const root = {
  width: "100%", minHeight: "100%",
  fontFamily: "Arial, sans-serif",  // ATS loves Arial
  background: "#fff", color: "#000",
  fontSize: 10.5, padding: "28px 32px",
  lineHeight: 1.5,
};

const header = {
  textAlign: "center",
  marginBottom: 16,
  paddingBottom: 12,
  borderBottom: "2px solid #000",
};

const name = {
  fontSize: 22, fontWeight: 700,
  color: "#000", marginBottom: 6,
  fontFamily: "Arial, sans-serif",
};

const contactRow = {
  fontSize: 9.5, color: "#333",
};

const section = {
  marginBottom: 14,
};

const sectionTitle = {
  fontSize: 10.5, fontWeight: 700,
  color: "#000", letterSpacing: 1.2,
  marginBottom: 3,
  fontFamily: "Arial, sans-serif",
};

const rule = {
  borderBottom: "1px solid #000",
  marginBottom: 8,
};

const summaryText = {
  fontSize: 10, color: "#222", lineHeight: 1.6,
};

const entry = {
  marginBottom: 10,
};

const entryHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
};

const entryTitle = {
  fontSize: 10.5, fontWeight: 700, color: "#000",
};

const entryDate = {
  fontSize: 9.5, color: "#333",
};

const entryCompany = {
  fontSize: 10, color: "#333",
  fontStyle: "italic", marginTop: 1,
};

const bulletList = {
  paddingLeft: 16, marginTop: 4,
};

const bulletItem = {
  fontSize: 10, color: "#222",
  lineHeight: 1.55, marginBottom: 2,
};

const skillsText = {
  fontSize: 10, color: "#222", lineHeight: 1.7,
};
