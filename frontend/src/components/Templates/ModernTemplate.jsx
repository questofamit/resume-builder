/**
 * Template: Modern
 * Two-column layout — dark sidebar + clean content
 */
import React from "react";

export default function ModernTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div style={root}>
      {/* ── Left Sidebar ─────────────────────────────── */}
      <aside style={sidebar}>
        {/* Initials avatar */}
        <div style={avatar}>
          {(personal.name || "?")
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        {/* Name + title area in sidebar */}
        <div style={sideSection}>
          <SideHeading>Contact</SideHeading>
          {personal.email    && <SideItem icon="✉" text={personal.email} />}
          {personal.phone    && <SideItem icon="📞" text={personal.phone} />}
          {personal.location && <SideItem icon="📍" text={personal.location} />}
          {personal.linkedin && <SideItem icon="in" text={personal.linkedin} mono />}
          {personal.website  && <SideItem icon="🌐" text={personal.website} />}
        </div>

        {skills?.length > 0 && (
          <div style={sideSection}>
            <SideHeading>Skills</SideHeading>
            <div style={skillGrid}>
              {skills.map((s) => (
                <span key={s} style={skillPill}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {education?.length > 0 && (
          <div style={sideSection}>
            <SideHeading>Education</SideHeading>
            {education.map((edu) => (
              <div key={edu.id || edu.institution} style={sideEduItem}>
                <div style={sideEduDeg}>{[edu.degree, edu.field].filter(Boolean).join(" in ")}</div>
                <div style={sideEduInst}>{edu.institution}</div>
                <div style={sideEduDate}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── Right Content ─────────────────────────────── */}
      <main style={content}>
        <div style={nameBlock}>
          <h1 style={nameText}>{personal.name || "Your Name"}</h1>
          {personal.summary && <p style={summaryText}>{personal.summary}</p>}
        </div>

        {experience?.length > 0 && (
          <Section title="Work Experience">
            {experience.map((exp) => (
              <ExpBlock key={exp.id || exp.company} exp={exp} />
            ))}
          </Section>
        )}

        {projects?.length > 0 && (
          <Section title="Projects">
            {projects.map((proj) => (
              <ProjBlock key={proj.id || proj.name} proj={proj} />
            ))}
          </Section>
        )}
      </main>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */
function SideHeading({ children }) {
  return (
    <div style={sideHeadStyle}>
      <span>{children}</span>
      <div style={sideHeadLine} />
    </div>
  );
}

function SideItem({ icon, text, mono }) {
  return (
    <div style={sideItemRow}>
      <span style={sideItemIcon}>{icon}</span>
      <span style={{ ...sideItemText, ...(mono ? { fontFamily: "'Fira Code', monospace", fontSize: 9.5 } : {}) }}>
        {text}
      </span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={sectionBlock}>
      <div style={sectionTitleRow}>
        <h2 style={sectionTitle}>{title}</h2>
        <div style={sectionRule} />
      </div>
      {children}
    </section>
  );
}

function ExpBlock({ exp }) {
  const bullets = (exp.description || "").split("\n").filter(Boolean);
  return (
    <div style={expBlock}>
      <div style={expHeader}>
        <div>
          <div style={expPosition}>{exp.position}</div>
          <div style={expCompany}>{exp.company}</div>
        </div>
        <div style={expDate}>
          {exp.startDate} {exp.startDate ? "–" : ""} {exp.current ? "Present" : exp.endDate}
        </div>
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

function ProjBlock({ proj }) {
  return (
    <div style={expBlock}>
      <div style={expHeader}>
        <div>
          <span style={expPosition}>{proj.name}</span>
          {proj.technologies && (
            <span style={techTag}> · {proj.technologies}</span>
          )}
        </div>
        {proj.url && <span style={projUrl}>{proj.url}</span>}
      </div>
      {proj.description && <p style={projDesc}>{proj.description}</p>}
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */
const SIDEBAR_W = 185;
const ACCENT    = "#2E76B5";
const DARK      = "#1C2140";

const root = {
  display: "flex", width: "100%", minHeight: "100%",
  fontFamily: "'DM Sans', sans-serif", background: "#fff", fontSize: 10,
};

const sidebar = {
  width: SIDEBAR_W, flexShrink: 0,
  background: DARK, color: "#fff",
  padding: "28px 16px", display: "flex",
  flexDirection: "column", gap: 20,
};

const avatar = {
  alignSelf: "center", width: 60, height: 60,
  borderRadius: "50%", background: ACCENT,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 22, fontWeight: 700, color: "#fff",
  letterSpacing: 1, flexShrink: 0,
};

const sideSection   = { display: "flex", flexDirection: "column", gap: 7 };
const sideHeadStyle = { display: "flex", alignItems: "center", gap: 6, marginBottom: 2 };
const sideHeadLine  = { flex: 1, height: 1, background: "rgba(255,255,255,.2)" };

const sideHeadText = {
  fontSize: 8, fontWeight: 700, letterSpacing: 1.4,
  textTransform: "uppercase", color: "rgba(255,255,255,.6)",
  whiteSpace: "nowrap",
};

// Override sideHeadStyle children text:
const sideItemRow  = { display: "flex", gap: 6, alignItems: "flex-start" };
const sideItemIcon = { fontSize: 9, opacity: .7, marginTop: 1, flexShrink: 0, minWidth: 12 };
const sideItemText = { fontSize: 9.5, color: "rgba(255,255,255,.85)", lineHeight: 1.4, wordBreak: "break-all" };

const skillGrid = { display: "flex", flexWrap: "wrap", gap: 4 };
const skillPill = {
  padding: "2px 7px", background: "rgba(255,255,255,.12)",
  borderRadius: 4, fontSize: 8.5, color: "rgba(255,255,255,.9)",
  fontWeight: 500,
};

const sideEduItem = { marginBottom: 8 };
const sideEduDeg  = { fontSize: 9, fontWeight: 600, color: "#fff", lineHeight: 1.3 };
const sideEduInst = { fontSize: 8.5, color: "rgba(255,255,255,.7)", marginTop: 1 };
const sideEduDate = { fontSize: 8, color: "rgba(255,255,255,.5)", marginTop: 2 };

const content  = { flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18 };
const nameBlock = { borderBottom: `3px solid ${ACCENT}`, paddingBottom: 12 };
const nameText  = {
  fontSize: 22, fontWeight: 700, color: DARK,
  fontFamily: "'Lora', Georgia, serif", lineHeight: 1.15, marginBottom: 6,
};
const summaryText = { fontSize: 9.5, color: "#555", lineHeight: 1.6, maxWidth: "95%" };

const sectionBlock    = { display: "flex", flexDirection: "column", gap: 10 };
const sectionTitleRow = { display: "flex", alignItems: "center", gap: 8 };
const sectionTitle    = {
  fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
  letterSpacing: 1.5, color: ACCENT, whiteSpace: "nowrap",
};
const sectionRule = { flex: 1, height: 1.5, background: "#E4E6EE" };

const expBlock    = { display: "flex", flexDirection: "column", gap: 4, marginBottom: 6 };
const expHeader   = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 };
const expPosition = { fontSize: 10.5, fontWeight: 700, color: DARK };
const expCompany  = { fontSize: 9.5, color: ACCENT, fontStyle: "italic", marginTop: 1 };
const expDate     = { fontSize: 8.5, color: "#888", whiteSpace: "nowrap", marginTop: 1 };
const bulletList  = { paddingLeft: 13, margin: "4px 0 0", display: "flex", flexDirection: "column", gap: 2 };
const bulletItem  = { fontSize: 9.5, color: "#444", lineHeight: 1.5 };
const techTag     = { fontSize: 9, color: "#888", fontStyle: "italic" };
const projUrl     = { fontSize: 8.5, color: ACCENT, fontStyle: "italic" };
const projDesc    = { fontSize: 9.5, color: "#444", lineHeight: 1.55, marginTop: 3 };
