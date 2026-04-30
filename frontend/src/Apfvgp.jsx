/**
 * App.jsx - Root component
 * Split-panel layout: left = form, right = live preview
 */
import React, { useState, useCallback } from "react";
import { ResumeProvider, useResume } from "./context/ResumeContext";
import PersonalForm  from "./components/Form/PersonalForm";
import EducationForm from "./components/Form/EducationForm";
import ExperienceForm from "./components/Form/ExperienceForm";
import SkillsForm    from "./components/Form/SkillsForm";
import ProjectsForm  from "./components/Form/ProjectsForm";
import ResumePreview from "./components/ResumePreview";

// ─── Section nav items ─────────────────────────────────────────────
const SECTIONS = [
  { id: "personal",   label: "Personal",   emoji: "👤" },
  { id: "experience", label: "Experience", emoji: "💼" },
  { id: "education",  label: "Education",  emoji: "🎓" },
  { id: "skills",     label: "Skills",     emoji: "⚡" },
  { id: "projects",   label: "Projects",   emoji: "🚀" },
];

const FORM_MAP = {
  personal:   PersonalForm,
  experience: ExperienceForm,
  education:  EducationForm,
  skills:     SkillsForm,
  projects:   ProjectsForm,
};

/* ── Inner app (needs context) ─────────────────────────────────── */
function AppInner() {
  const [activeSection, setActiveSection] = useState("personal");
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [mobileTab, setMobileTab] = useState("edit"); // "edit" | "preview"
  const { resetResume } = useResume();

  const ActiveForm = FORM_MAP[activeSection] || PersonalForm;

  return (
    <div style={appShell}>
      {/* ══ TOP NAV ═════════════════════════════════════════════════ */}
      <header style={topNav} className="no-print">
        <div style={brand}>
          <span style={brandIcon}>📄</span>
          <span style={brandName}>ResumeForge</span>
          <span style={brandTag}>Free Resume Builder</span>
        </div>

        {/* Mobile preview toggle */}
        <div style={mobileTabs}>
          <button
            style={{ ...mobileTabBtn, ...(mobileTab === "edit" ? mobileTabActive : {}) }}
            onClick={() => setMobileTab("edit")}
          >
            ✏️ Edit
          </button>
          <button
            style={{ ...mobileTabBtn, ...(mobileTab === "preview" ? mobileTabActive : {}) }}
            onClick={() => setMobileTab("preview")}
          >
            👁 Preview
          </button>
        </div>

        <button
          style={resetBtn}
          onClick={() => { if (window.confirm("Reset all resume data?")) resetResume(); }}
          title="Reset all fields"
        >
          ↺ Reset
        </button>
      </header>

      {/* ══ MAIN LAYOUT ════════════════════════════════════════════ */}
      <div style={mainLayout}>
        {/* ── LEFT: Section nav + form ──────────────────────────── */}
        <div
          style={{
            ...leftPanel,
            // Mobile: hide if previewing
            display: mobileTab === "preview" ? "none" : "flex",
          }}
          className="no-print"
        >
          {/* Section tabs */}
          <nav style={sectionNav}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  ...navBtn,
                  ...(activeSection === s.id ? navBtnActive : {}),
                }}
              >
                <span style={navEmoji}>{s.emoji}</span>
                <span style={navLabel}>{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Active form */}
          <div style={formArea}>
            <ActiveForm />
          </div>
        </div>

        {/* ── RIGHT: Live resume preview ────────────────────────── */}
        <div
          style={{
            ...rightPanel,
            display: mobileTab === "edit" ? "none" : "flex",
          }}
        >
          <ResumePreview
            activeTemplate={activeTemplate}
            onTemplateChange={setActiveTemplate}
          />
        </div>
      </div>
    </div>
  );
}

/* ── App wrapper with provider ─────────────────────────────────── */
export default function App() {
  return (
    <ResumeProvider>
      <AppInner />
    </ResumeProvider>
  );
}

/* ── Styles ──────────────────────────────────────────────────────── */
const appShell = {
  display: "flex", flexDirection: "column",
  height: "100vh", overflow: "hidden",
  background: "var(--gray-50)",
};

const topNav = {
  display: "flex", alignItems: "center", gap: 12,
  padding: "0 20px", height: 54,
  background: "var(--white)",
  borderBottom: "1.5px solid var(--gray-200)",
  boxShadow: "var(--shadow-sm)",
  flexShrink: 0, zIndex: 10,
};

const brand = { display: "flex", alignItems: "center", gap: 8, flex: 1 };
const brandIcon = { fontSize: 22 };
const brandName = {
  fontSize: 17, fontWeight: 800, color: "var(--ink-2)",
  letterSpacing: "-.4px",
};
const brandTag = {
  fontSize: 11, color: "var(--gray-400)", fontWeight: 400,
  display: "none",
  // Show on larger screens via media query below
};

const mobileTabs = { display: "flex", gap: 3 };
const mobileTabBtn = {
  padding: "5px 12px", fontSize: 12, fontWeight: 600,
  border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)",
  background: "transparent", color: "var(--gray-500)",
  cursor: "pointer", fontFamily: "var(--font-ui)",
  transition: "all var(--dur) var(--ease)",
};
const mobileTabActive = {
  background: "var(--ink-2)", color: "var(--white)",
  border: "1.5px solid var(--ink-2)",
};

const resetBtn = {
  padding: "5px 12px", fontSize: 12, fontWeight: 600,
  border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)",
  background: "transparent", color: "var(--gray-500)",
  cursor: "pointer", fontFamily: "var(--font-ui)",
  transition: "all var(--dur) var(--ease)",
};

const mainLayout = {
  display: "flex", flex: 1, overflow: "hidden",
  minHeight: 0,
};

const leftPanel = {
  width: 360, flexShrink: 0,
  borderRight: "1.5px solid var(--gray-200)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "var(--white)",
  minHeight: 0,
};

const sectionNav = {
  display: "flex", gap: 0,
  borderBottom: "1.5px solid var(--gray-200)",
  overflowX: "auto", flexShrink: 0,
  padding: "0 4px",
};

const navBtn = {
  display: "flex", flexDirection: "column", alignItems: "center",
  gap: 2, padding: "10px 8px",
  border: "none", borderBottom: "2.5px solid transparent",
  background: "transparent", cursor: "pointer",
  fontFamily: "var(--font-ui)", transition: "all var(--dur) var(--ease)",
  flexShrink: 0,
};

const navBtnActive = {
  borderBottomColor: "var(--blue)",
  background: "var(--blue-muted)",
};

const navEmoji = { fontSize: 16 };
const navLabel = { fontSize: 10, fontWeight: 600, color: "var(--gray-600)", letterSpacing: ".2px" };

const formArea = {
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  padding: "16px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 0,
};

const rightPanel = {
  flex: 1, overflow: "hidden",
  flexDirection: "column",
  padding: 16,
  minWidth: 0,
  // Mobile override
  "@media (max-width: 768px)": { padding: 8 },
};

/* ── Inject responsive styles ─────────────────────────────────────── */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @media (min-width: 900px) {
      .brand-tag { display: inline !important; }
      .mobile-tabs { display: none !important; }
      .left-panel { display: flex !important; }
      .right-panel { display: flex !important; }
    }
    @media (max-width: 899px) {
      .left-panel  { width: 100% !important; }
      .right-panel { width: 100% !important; }
    }
  `;
  document.head.appendChild(style);
}
