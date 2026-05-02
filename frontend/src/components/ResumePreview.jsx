import React, { useRef, useCallback, useState } from "react";
import { useResume, TEMPLATES } from "../context/ResumeContext";
import ModernTemplate  from "./Templates/ModernTemplate";
import ClassicTemplate from "./Templates/ClassicTemplate";
import MinimalTemplate from "./Templates/MinimalTemplate";
import ATSTemplate     from "./Templates/ATSTemplate";
import { useDownload }  from "../hooks/useDownload";
import { Button } from "./UI";

const TEMPLATE_MAP = {
  modern:  ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  ats:     ATSTemplate,
};

export default function ResumePreview({ activeTemplate, onTemplateChange }) {
  const { resume } = useResume();
  const { downloadDOCX, loading, error } = useDownload();
  const previewRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const TemplateComp = TEMPLATE_MAP[activeTemplate] || ModernTemplate;

  // PDF Download — html2canvas + jsPDF
  const handlePDF = useCallback(async () => {
    if (!previewRef.current) return;
    setPdfLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF       = (await import("jspdf")).jsPDF;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf     = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
      const pageW   = pdf.internal.pageSize.getWidth();
      const pageH   = pdf.internal.pageSize.getHeight();
      const ratio   = Math.min(pageW / canvas.width, pageH / canvas.height);

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width * ratio, canvas.height * ratio);
      pdf.save(`${resume.personal.name || "resume"}_resume.pdf`);
    } catch (err) {
      alert("PDF error: " + err.message);
    } finally {
      setPdfLoading(false);
    }
  }, [resume.personal.name]);

  // Print
  const handlePrint = useCallback(() => {
    const content = previewRef.current?.innerHTML;
    if (!content) return;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
      <title>${resume.personal.name || "Resume"}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet"/>
      <style>* { box-sizing:border-box; margin:0; padding:0; } body { background:white; -webkit-print-color-adjust:exact; } @page { size:letter; margin:0; }</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  }, [resume.personal.name]);

  return (
    <div style={wrapper}>
      <div style={toolbar}>
        <div style={templateTabs}>
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => onTemplateChange(t.id)}
              style={{
                ...tabBtn,
                ...(activeTemplate === t.id ? tabActive : {}),
                ...(t.id === "ats" ? atsTabStyle : {}),
              }}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={actions}>
          <Button variant="outline" size="sm" onClick={handlePrint}>🖨 Print</Button>
          <Button variant="outline" size="sm" loading={loading.docx} onClick={() => downloadDOCX(resume)}>📄 DOCX</Button>
          <Button variant="blue" size="sm" loading={pdfLoading} onClick={handlePDF}>⬇ PDF</Button>
        </div>
      </div>

      {/* ATS notice */}
      {activeTemplate === "ats" && (
        <div style={atsBanner}>
          ✅ ATS Friendly Template — Plain text, single column, readable by all job portals
        </div>
      )}

      {error && (
        <div style={errorBanner}>
          ⚠️ DOCX के लिए backend चालू करो
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
const templateTabs = { display:"flex", gap:3, flexWrap:"wrap" };
const tabBtn       = { padding:"5px 12px", fontSize:12, fontWeight:500, border:"1.5px solid var(--gray-200)", borderRadius:"var(--r-md)", background:"transparent", color:"var(--gray-500)", cursor:"pointer", fontFamily:"var(--font-ui)" };
const tabActive    = { background:"var(--ink-2)", color:"var(--white)", border:"1.5px solid var(--ink-2)" };
const atsTabStyle  = { borderColor:"#22C55E", color:"#16A34A" };
const actions      = { display:"flex", gap:6, alignItems:"center" };
const atsBanner    = { background:"#F0FDF4", color:"#16A34A", padding:"8px 14px", fontSize:12, borderBottom:"1px solid #BBF7D0", fontWeight:500 };
const errorBanner  = { background:"#FEF2F2", color:"#B91C1C", padding:"8px 14px", fontSize:12, borderBottom:"1px solid #FECACA" };
const scrollArea   = { flex:1, overflowY:"auto", padding:"20px 12px", display:"flex", justifyContent:"center" };
const paperWrap    = { width:"100%", maxWidth:680 };
const paper        = { width:"100%", minHeight:880, background:"#ffffff", boxShadow:"0 2px 8px rgba(0,0,0,.12)", borderRadius:2, overflow:"hidden" };
