/**
 * useDownload hook
 * Calls the backend to generate PDF / DOCX and triggers browser download
 */
import { useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export function useDownload() {
  const [loading, setLoading] = useState({ pdf: false, docx: false });
  const [error,   setError  ] = useState(null);

  const download = useCallback(async (resumeData, format) => {
    setLoading((prev) => ({ ...prev, [format]: true }));
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/resume/${format}`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(resumeData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      // Stream the binary response into a Blob and trigger download
      const blob        = await res.blob();
      const url         = URL.createObjectURL(blob);
      const a           = document.createElement("a");
      a.href            = url;
      a.download        = `${(resumeData.personal?.name || "resume").replace(/\s+/g, "_")}_resume.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, [format]: false }));
    }
  }, []);

  const downloadPDF  = useCallback((data) => download(data, "pdf"),  [download]);
  const downloadDOCX = useCallback((data) => download(data, "docx"), [download]);

  return { downloadPDF, downloadDOCX, loading, error };
}
