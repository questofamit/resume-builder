import React, { useState } from "react";
import { ResumeProvider, useResume } from "./context/ResumeContext";
import PersonalForm   from "./components/Form/PersonalForm";
import EducationForm  from "./components/Form/EducationForm";
import ExperienceForm from "./components/Form/ExperienceForm";
import SkillsForm     from "./components/Form/SkillsForm";
import ProjectsForm   from "./components/Form/ProjectsForm";
import ResumePreview  from "./components/ResumePreview";

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

function AppInner() {
  const [activeSection, setActiveSection]   = useState("personal");
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [mobileTab, setMobileTab]           = useState("edit");
  const { resetResume } = useResume();
  const ActiveForm = FORM_MAP[activeSection] || PersonalForm;

  return (
    <div style={appShell}>

      <header style={topNav}>
        <div style={brand}>
          <span style={{ fontSize: 22 }}>📄</span>
          <span style={brandName}>ResumeForge</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => setMobileTab("edit")}
            style={{ ...tabBtn, ...(mobileTab === "edit" ? tabActive : {}) }}>✏️ Edit</button>
          <button onClick={() => setMobileTab("preview")}
            style={{ ...tabBtn, ...(mobileTab === "preview" ? tabActive : {}) }}>👁 Preview</button>
        </div>
        <button style={resetBtn}
          onClick={() => { if (window.confirm("Reset?")) resetResume(); }}>↺ Reset</button>
      </header>

      {mobileTab === "edit" && (
        <nav style={sectionBar}>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ ...secBtn, ...(activeSection === s.id ? secBtnActive : {}) }}>
              <span>{s.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</span>
            </button>
          ))}
        </nav>
      )}

      <div style={mainArea}>
        {mobileTab !== "preview" && (
          <div style={formCol}>
            <ActiveForm />
          </div>
        )}
        {mobileTab !== "edit" && (
          <div style={previewCol}>
            <ResumePreview activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
          </div>
        )}
      </div>

    </div>
  );
}

export default function App() {
  return <ResumeProvider><AppInner /></ResumeProvider>;
}

const NAV_H = 54;
const TAB_H = 48;
const TOTAL = NAV_H + TAB_H;

const appShell  = { display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--gray-50)" };
const topNav    = { position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", gap: 12, padding: "0 20px", height: NAV_H, background: "var(--white)", borderBottom: "1.5px solid var(--gray-200)", boxShadow: "var(--shadow-sm)" };
const brand     = { display: "flex", alignItems: "center", gap: 8, flex: 1 };
const brandName = { fontSize: 17, fontWeight: 800, color: "var(--ink-2)", letterSpacing: "-.4px" };
const tabBtn    = { padding: "5px 12px", fontSize: 12, fontWeight: 600, border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)", background: "transparent", color: "var(--gray-500)", cursor: "pointer", fontFamily: "var(--font-ui)" };
const tabActive = { background: "var(--ink-2)", color: "var(--white)", border: "1.5px solid var(--ink-2)" };
const resetBtn  = { padding: "5px 12px", fontSize: 12, fontWeight: 600, border: "1.5px solid var(--gray-200)", borderRadius: "var(--r-md)", background: "transparent", color: "var(--gray-500)", cursor: "pointer", fontFamily: "var(--font-ui)" };
const sectionBar   = { position: "sticky", top: NAV_H, zIndex: 99, display: "flex", background: "var(--white)", borderBottom: "1.5px solid var(--gray-200)", overflowX: "auto", height: TAB_H, flexShrink: 0 };
const secBtn       = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: "6px 14px", border: "none", borderBottom: "2.5px solid transparent", background: "transparent", cursor: "pointer", fontFamily: "var(--font-ui)", whiteSpace: "nowrap", flexShrink: 0 };
const secBtnActive = { borderBottomColor: "var(--blue)", background: "var(--blue-muted)" };
const mainArea  = { display: "flex", flex: 1, alignItems: "flex-start" };
const formCol   = { width: 380, flexShrink: 0, padding: "20px 16px", borderRight: "1.5px solid var(--gray-200)", background: "var(--white)" };
const previewCol = { flex: 1, position: "sticky", top: TOTAL, height: `calc(100vh - ${TOTAL}px)`, padding: 16, display: "flex", flexDirection: "column" };
