/**
 * PDF Generator
 * Builds a professional resume PDF using pdf-lib
 */

const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

// ─── Color Palette ─────────────────────────────────────────────────────────────
const COLORS = {
  primary: rgb(0.11, 0.13, 0.24),    // Deep navy #1C2140
  accent:  rgb(0.18, 0.46, 0.71),    // Professional blue #2E76B5
  text:    rgb(0.2,  0.2,  0.2),     // Dark gray #333333
  muted:   rgb(0.45, 0.45, 0.45),    // Medium gray #737373
  light:   rgb(0.95, 0.95, 0.97),    // Near-white bg #F2F2F7
  white:   rgb(1,    1,    1),
  rule:    rgb(0.82, 0.82, 0.88),    // Divider #D1D1E0
};

// ─── Layout Constants ──────────────────────────────────────────────────────────
const PAGE_W = 612;   // US Letter
const PAGE_H = 792;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

/**
 * Draw a horizontal rule line
 */
function drawRule(page, y, color = COLORS.rule) {
  page.drawLine({
    start: { x: MARGIN, y },
    end:   { x: PAGE_W - MARGIN, y },
    thickness: 0.75,
    color,
  });
}

/**
 * Draw a section header (bold label + rule)
 * Returns new Y position
 */
function drawSectionHeader(page, text, y, boldFont) {
  const labelY = y - 6;
  page.drawText(text.toUpperCase(), {
    x: MARGIN,
    y: labelY,
    size: 8.5,
    font: boldFont,
    color: COLORS.accent,
    characterSpacing: 1.8,
  });
  drawRule(page, labelY - 6);
  return labelY - 18;
}

/**
 * Wrap text to fit within maxWidth, return array of lines
 */
function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Draw wrapped text block, return final Y
 */
function drawWrapped(page, text, x, y, font, size, color, maxWidth, lineHeight = 1.4) {
  const lines = wrapText(text || "", font, size, maxWidth);
  let curY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: curY, size, font, color });
    curY -= size * lineHeight;
  }
  return curY;
}

/**
 * Main PDF generation function
 * @param {Object} data - Validated resume data
 * @returns {Buffer} PDF bytes
 */
async function generatePDF(data) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle(`${data.personal.name} - Resume`);
  pdfDoc.setAuthor(data.personal.name);

  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  // Helper: add new page if needed
  const checkPage = (neededHeight) => {
    if (y - neededHeight < MARGIN + 20) {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  };

  // ── Header Block ────────────────────────────────────────────────────────────
  // Name
  const name = data.personal.name || "Your Name";
  page.drawText(name, {
    x: MARGIN,
    y,
    size: 26,
    font: boldFont,
    color: COLORS.primary,
  });
  y -= 30;

  // Contact row
  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.website,
  ].filter(Boolean);

  if (contactParts.length) {
    const contactLine = contactParts.join("  ·  ");
    page.drawText(contactLine, {
      x: MARGIN,
      y,
      size: 8.5,
      font: regularFont,
      color: COLORS.muted,
    });
    y -= 14;
  }

  // Accent bar
  page.drawRectangle({
    x: MARGIN,
    y: y - 2,
    width: 60,
    height: 3,
    color: COLORS.accent,
  });
  y -= 18;

  // ── Summary ────────────────────────────────────────────────────────────────
  if (data.personal.summary) {
    checkPage(60);
    y = drawSectionHeader(page, "Professional Summary", y, boldFont);
    y = drawWrapped(page, data.personal.summary, MARGIN, y, regularFont, 9.5, COLORS.text, CONTENT_W);
    y -= 12;
  }

  // ── Experience ─────────────────────────────────────────────────────────────
  if (data.experience?.length) {
    checkPage(60);
    y = drawSectionHeader(page, "Work Experience", y, boldFont);

    for (const exp of data.experience) {
      checkPage(50);
      // Position title
      page.drawText(exp.position || "Position", {
        x: MARGIN, y,
        size: 10.5, font: boldFont, color: COLORS.primary,
      });

      // Date range (right-aligned)
      const dateStr = exp.endDate
        ? `${exp.startDate} – ${exp.current ? "Present" : exp.endDate}`
        : exp.startDate;
      if (dateStr) {
        const dateW = regularFont.widthOfTextAtSize(dateStr, 8.5);
        page.drawText(dateStr, {
          x: PAGE_W - MARGIN - dateW, y,
          size: 8.5, font: regularFont, color: COLORS.muted,
        });
      }
      y -= 13;

      // Company name
      page.drawText(exp.company || "", {
        x: MARGIN, y,
        size: 9, font: italicFont, color: COLORS.accent,
      });
      y -= 14;

      // Bullet description
      if (exp.description) {
        const bullets = exp.description.split("\n").filter(Boolean);
        for (const bullet of bullets) {
          checkPage(20);
          page.drawText("•", { x: MARGIN + 2, y, size: 9, font: regularFont, color: COLORS.text });
          y = drawWrapped(page, bullet, MARGIN + 12, y, regularFont, 9, COLORS.text, CONTENT_W - 14);
        }
      }
      y -= 10;
    }
  }

  // ── Education ─────────────────────────────────────────────────────────────
  if (data.education?.length) {
    checkPage(60);
    y = drawSectionHeader(page, "Education", y, boldFont);

    for (const edu of data.education) {
      checkPage(40);
      const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
      page.drawText(degree || "Degree", {
        x: MARGIN, y,
        size: 10.5, font: boldFont, color: COLORS.primary,
      });

      const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
      if (dateStr) {
        const dateW = regularFont.widthOfTextAtSize(dateStr, 8.5);
        page.drawText(dateStr, {
          x: PAGE_W - MARGIN - dateW, y,
          size: 8.5, font: regularFont, color: COLORS.muted,
        });
      }
      y -= 13;

      page.drawText(edu.institution || "", {
        x: MARGIN, y,
        size: 9, font: italicFont, color: COLORS.accent,
      });
      if (edu.gpa) {
        page.drawText(`GPA: ${edu.gpa}`, {
          x: MARGIN + regularFont.widthOfTextAtSize(edu.institution, 9) + 12,
          y,
          size: 8.5, font: regularFont, color: COLORS.muted,
        });
      }
      y -= 16;
    }
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  if (data.skills?.length) {
    checkPage(50);
    y = drawSectionHeader(page, "Skills", y, boldFont);

    // Render as tag-like pills inline
    let x = MARGIN;
    const skillLineY = y;

    for (const skill of data.skills) {
      const skillW = boldFont.widthOfTextAtSize(skill, 8.5) + 14;
      if (x + skillW > PAGE_W - MARGIN) {
        x = MARGIN;
        y -= 18;
      }
      // Pill background
      page.drawRectangle({ x: x - 4, y: y - 2, width: skillW, height: 14, color: COLORS.light });
      page.drawText(skill, { x, y: y + 1, size: 8.5, font: boldFont, color: COLORS.accent });
      x += skillW + 6;
    }
    y -= 22;
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  if (data.projects?.length) {
    checkPage(60);
    y = drawSectionHeader(page, "Projects", y, boldFont);

    for (const proj of data.projects) {
      checkPage(40);
      page.drawText(proj.name || "Project", {
        x: MARGIN, y,
        size: 10.5, font: boldFont, color: COLORS.primary,
      });
      if (proj.technologies) {
        const techStr = `  [${proj.technologies}]`;
        const offset = boldFont.widthOfTextAtSize(proj.name, 10.5);
        page.drawText(techStr, {
          x: MARGIN + offset, y,
          size: 8.5, font: italicFont, color: COLORS.muted,
        });
      }
      y -= 13;

      if (proj.description) {
        y = drawWrapped(page, proj.description, MARGIN, y, regularFont, 9, COLORS.text, CONTENT_W);
      }
      if (proj.url) {
        page.drawText(proj.url, {
          x: MARGIN, y,
          size: 8.5, font: italicFont, color: COLORS.accent,
        });
        y -= 13;
      }
      y -= 8;
    }
  }

  // ── Footer page numbers ────────────────────────────────────────────────────
  const pages = pdfDoc.getPages();
  pages.forEach((pg, i) => {
    pg.drawText(`${i + 1} / ${pages.length}`, {
      x: PAGE_W / 2 - 12,
      y: 20,
      size: 7.5,
      font: regularFont,
      color: COLORS.muted,
    });
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generatePDF };
