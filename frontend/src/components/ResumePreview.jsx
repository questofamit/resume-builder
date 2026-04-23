import React, { useRef, useCallback } from "react";
import { useResume, TEMPLATES } from "../context/ResumeContext";
import ModernTemplate  from "./Templates/ModernTemplate";
import ClassicTemplate from "./Templates/ClassicTemplate";
import MinimalTemplate from "./Templates/MinimalTemplate";
import { useDownload }  from "../hooks/useDownload";
import { Button } from "./UI";

const TEMPLATE_MAP = {
  modern:  ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

export default function ResumePreview({ activeTemplate, onTemplateChange }) {
  const { resume } = useResume();
  const { downloadPDF, downloadDOCX, loading, error } = useDownload();
  const previewRef = useRef(null);
  const TemplateComp = TEMPLATE_MAP[activeTemplate] || ModernTemplate;

  const handlePrint = useCallback(() => {
    const content = previewRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
      <title>${resume.personal.name || "Resume"}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
      <style>* { box-sizing:border-box; margin:0; padding:0; } body { background:white; -webkit-print-color-adjust:exact; } @page { size:letter; margin:0; }</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
  }, [resume.personal.name]);

  return (
    <div style={wrapper}>
      <div style={toolbar}>
        <div style={templateTabs}>
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => onTemplateChange(t.id)}
              style={{ ...tabBtn, ...(activeTemplate === t.id ? tabActive : {}) }}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={actions}>
          <Button variant="outline" size="sm" onClick={handlePrint}>��� Print</Button>
          <Button variant="outline" size="sm" loading={loading.docx} onClick={() => downloadDOCX(resume)}>��� DOCX</Button>
          <Button variant="blue"    size="sm" loading={loading.pdf}  onClick={() => downloadPDF(resume)}>⬇ PDF</Button>
        </div>
      </div>

      {error && (
        <div style={errorBanner}>
          ⚠️ Backend नहीं चल रहा — PDF/DOCX के लिए backend terminal में चालू करो
        </div>
      )}

      <div style={scrollArea}>
        <div style={paperWrap}>
          <div ref={previewRef} style={paper}>
            <TemplateComp data={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapper      = { display:"flex", flexDirection:"column", height:"100%", background:"var(--gray-100)", borderRadius:"var(--r-lg)", overflow:"hidden", border:"1.5px solid var(--gray-200)" };
const toolbar      = { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", gap:10, flexWrap:"wrap", background:"var(--white)", borderBottom:"1px solid var(--gray-200)", flexShrink:0 };
const templateTabs = { display:"flex", gap:3 };
const tabBtn       = { padding:"5px 12px", fontSize:12, fontWeight:500, border:"1.5px solid var(--gray-200)", borderRadius:"var(--r-md)", background:"transparent", color:"var(--gray-500)", cursor:"pointer", fontFamily:"var(--font-ui)" };
const tabActive    = { background:"var(--ink-2)", color:"var(--white)", border:"1.5px solid var(--ink-2)" };
const actions      = { display:"flex", gap:6, alignItems:"center" };
const errorBanner  = { background:"#FEF2F2", color:"#B91C1C", padding:"8px 14px", fontSize:12, borderBottom:"1px solid #FECACA" };
const scrollArea   = { flex:1, overflowY:"auto", padding:"20px 12px", display:"flex", justifyContent:"center" };
const paperWrap    = { width:"100%", maxWidth:680 };
const paper        = { width:"100%", minHeight:880, background:"#ffffff", boxShadow:"0 2px 8px rgba(0,0,0,.12)", borderRadius:2, overflow:"hidden" };
