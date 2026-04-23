/**
 * Resume Routes
 * POST /api/resume/pdf   → returns PDF binary
 * POST /api/resume/docx  → returns DOCX binary
 * POST /api/resume/validate → validates data, returns parsed JSON
 */

const express = require("express");
const router  = express.Router();
const { validateResumeData } = require("../utils/validation");
const { generatePDF }        = require("../generators/pdfGenerator");
const { generateDOCX }       = require("../generators/docxGenerator");

// ─── Validate ─────────────────────────────────────────────────────────────────
router.post("/validate", (req, res) => {
  const result = validateResumeData(req.body);
  if (!result.valid) {
    return res.status(400).json({ success: false, errors: result.errors });
  }
  return res.json({ success: true, data: result.data });
});

// ─── Generate PDF ─────────────────────────────────────────────────────────────
router.post("/pdf", async (req, res) => {
  try {
    const validation = validateResumeData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    const pdfBuffer = await generatePDF(validation.data);

    const fileName = `${(validation.data.personal.name || "resume")
      .replace(/\s+/g, "_")}_resume.pdf`;

    res.set({
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length":      pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (err) {
    console.error("[PDF Error]", err);
    return res.status(500).json({ success: false, error: "Failed to generate PDF." });
  }
});

// ─── Generate DOCX ────────────────────────────────────────────────────────────
router.post("/docx", async (req, res) => {
  try {
    const validation = validateResumeData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    const docxBuffer = await generateDOCX(validation.data);

    const fileName = `${(validation.data.personal.name || "resume")
      .replace(/\s+/g, "_")}_resume.docx`;

    res.set({
      "Content-Type":        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length":      docxBuffer.length,
    });

    return res.send(docxBuffer);
  } catch (err) {
    console.error("[DOCX Error]", err);
    return res.status(500).json({ success: false, error: "Failed to generate DOCX." });
  }
});

module.exports = router;
