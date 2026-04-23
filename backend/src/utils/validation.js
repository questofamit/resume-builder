/**
 * Resume Data Validation
 * Validates and sanitizes incoming resume JSON
 */

/**
 * Sanitize a string: trim + strip dangerous characters
 * @param {any} val
 * @param {string} fallback
 */
const sanitize = (val, fallback = "") =>
  typeof val === "string" ? val.trim().replace(/[<>]/g, "") : fallback;

/**
 * Validate the resume payload sent from the frontend.
 * Returns { valid: true, data } or { valid: false, errors: [...] }
 */
function validateResumeData(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a JSON object."] };
  }

  const { personal, education, experience, skills, projects } = body;

  // ── Personal ──────────────────────────────────────────────────────────────
  if (!personal || typeof personal !== "object") {
    errors.push("personal section is required.");
  } else {
    if (!sanitize(personal.name)) errors.push("personal.name is required.");
    if (!sanitize(personal.email)) errors.push("personal.email is required.");
  }

  // ── Education (optional array) ────────────────────────────────────────────
  if (education !== undefined && !Array.isArray(education)) {
    errors.push("education must be an array.");
  }

  // ── Experience (optional array) ───────────────────────────────────────────
  if (experience !== undefined && !Array.isArray(experience)) {
    errors.push("experience must be an array.");
  }

  // ── Skills (optional array of strings) ───────────────────────────────────
  if (skills !== undefined && !Array.isArray(skills)) {
    errors.push("skills must be an array.");
  }

  // ── Projects (optional array) ─────────────────────────────────────────────
  if (projects !== undefined && !Array.isArray(projects)) {
    errors.push("projects must be an array.");
  }

  if (errors.length > 0) return { valid: false, errors };

  // ── Build clean data object ───────────────────────────────────────────────
  const data = {
    personal: {
      name: sanitize(personal.name),
      email: sanitize(personal.email),
      phone: sanitize(personal.phone),
      location: sanitize(personal.location),
      linkedin: sanitize(personal.linkedin),
      website: sanitize(personal.website),
      summary: sanitize(personal.summary),
    },
    education: Array.isArray(education)
      ? education.map((e) => ({
          institution: sanitize(e.institution),
          degree: sanitize(e.degree),
          field: sanitize(e.field),
          startDate: sanitize(e.startDate),
          endDate: sanitize(e.endDate),
          gpa: sanitize(e.gpa),
        }))
      : [],
    experience: Array.isArray(experience)
      ? experience.map((e) => ({
          company: sanitize(e.company),
          position: sanitize(e.position),
          startDate: sanitize(e.startDate),
          endDate: sanitize(e.endDate),
          current: Boolean(e.current),
          description: sanitize(e.description),
        }))
      : [],
    skills: Array.isArray(skills)
      ? skills.map((s) => sanitize(s)).filter(Boolean)
      : [],
    projects: Array.isArray(projects)
      ? projects.map((p) => ({
          name: sanitize(p.name),
          description: sanitize(p.description),
          technologies: sanitize(p.technologies),
          url: sanitize(p.url),
        }))
      : [],
  };

  return { valid: true, data };
}

module.exports = { validateResumeData };
