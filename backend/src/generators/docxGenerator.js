const {
  Document, Paragraph, TextRun, AlignmentType,
  BorderStyle, Packer, ShadingType,
} = require("docx");

const C = {
  primary: "1C2140", accent: "2E76B5",
  muted: "737373", rule: "D1D1E0", light: "F2F2F7",
};

function sectionHeading(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, color: C.accent, characterSpacing: 120 })],
    spacing: { before: 280, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.rule } },
  });
}

function entryHeader(title, subtitle, date) {
  const children = [
    new TextRun({ text: title, bold: true, size: 22, color: C.primary }),
  ];
  if (subtitle) children.push(new TextRun({ text: "  ·  " + subtitle, italics: true, size: 18, color: C.accent }));
  if (date)     children.push(new TextRun({ text: "  |  " + date, size: 17, color: C.muted }));
  return new Paragraph({ children, spacing: { before: 160, after: 40 } });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, color: "333333" })],
    bullet: { level: 0 },
    spacing: { after: 40 },
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: opts.size || 20, color: opts.color || "333333", bold: opts.bold || false, italics: opts.italics || false })],
    spacing: { after: opts.spacingAfter || 60 },
  });
}

async function generateDOCX(data) {
  const sections = [];

  // Name
  sections.push(new Paragraph({
    children: [new TextRun({ text: data.personal.name || "Your Name", bold: true, size: 52, color: C.primary })],
    spacing: { after: 60 },
  }));

  // Contact
  const contactParts = [data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin, data.personal.website].filter(Boolean);
  if (contactParts.length) {
    sections.push(new Paragraph({
      children: [new TextRun({ text: contactParts.join("  ·  "), size: 17, color: C.muted })],
      spacing: { after: 120 },
    }));
  }

  // Summary
  if (data.personal.summary) {
    sections.push(sectionHeading("Professional Summary"));
    sections.push(para(data.personal.summary, { size: 19 }));
  }

  // Experience
  if (data.experience?.length) {
    sections.push(sectionHeading("Work Experience"));
    for (const exp of data.experience) {
      const date = [exp.startDate, exp.current ? "Present" : exp.endDate].filter(Boolean).join(" – ");
      sections.push(entryHeader(exp.position, exp.company, date));
      if (exp.description) {
        for (const line of exp.description.split("\n").filter(Boolean)) {
          sections.push(bullet(line));
        }
      }
    }
  }

  // Education
  if (data.education?.length) {
    sections.push(sectionHeading("Education"));
    for (const edu of data.education) {
      const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
      const date   = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
      sections.push(entryHeader(degree || "Degree", edu.institution, date));
      if (edu.gpa) sections.push(para("GPA: " + edu.gpa, { size: 17, color: C.muted }));
    }
  }

  // Skills
  if (data.skills?.length) {
    sections.push(sectionHeading("Skills"));
    sections.push(para(data.skills.join("  ·  "), { size: 18 }));
  }

  // Projects
  if (data.projects?.length) {
    sections.push(sectionHeading("Projects"));
    for (const proj of data.projects) {
      const title = proj.technologies ? `${proj.name}  [${proj.technologies}]` : proj.name;
      sections.push(entryHeader(title || "Project", "", ""));
      if (proj.description) sections.push(para(proj.description, { size: 18 }));
      if (proj.url)         sections.push(para(proj.url, { size: 17, color: C.accent, italics: true }));
    }
  }

  const doc = new Document({
    creator: data.personal.name,
    title: `${data.personal.name} - Resume`,
    styles: {
      default: { document: { run: { font: "Calibri", size: 20, color: "333333" } } },
    },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 1008, right: 1008 } } },
      children: sections,
    }],
  });

  return Packer.toBuffer(doc);
}

module.exports = { generateDOCX };
