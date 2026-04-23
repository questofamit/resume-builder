/**
 * ResumeContext
 * Global state for resume data, active template, and UI state
 */
import { createContext, useContext, useReducer, useCallback } from "react";

// ─── Initial Resume Data ──────────────────────────────────────────────────────
export const INITIAL_RESUME = {
  personal: {
    name:     "Alex Johnson",
    email:    "alex@example.com",
    phone:    "+1 (555) 000-1234",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website:  "alexjohnson.dev",
    summary:
      "Full-stack engineer with 5+ years building scalable web applications. Passionate about clean code, great UX, and shipping products people love.",
  },
  education: [
    {
      id:          "edu-1",
      institution: "UC Berkeley",
      degree:      "Bachelor of Science",
      field:       "Computer Science",
      startDate:   "Aug 2015",
      endDate:     "May 2019",
      gpa:         "3.8",
    },
  ],
  experience: [
    {
      id:          "exp-1",
      company:     "Stripe",
      position:    "Senior Software Engineer",
      startDate:   "Jan 2022",
      endDate:     "",
      current:     true,
      description: "Led backend refactor reducing API latency by 40%\nBuilt real-time fraud detection pipeline processing 2M events/day\nMentored 3 junior engineers; improved team velocity by 25%",
    },
    {
      id:          "exp-2",
      company:     "Airbnb",
      position:    "Software Engineer",
      startDate:   "Jun 2019",
      endDate:     "Dec 2021",
      current:     false,
      description: "Developed core search ranking algorithm serving 100M+ queries/month\nCollaborated cross-functionally to ship mobile-first redesign\nImproved test coverage from 60% to 92%",
    },
  ],
  skills: [
    "TypeScript", "React", "Node.js", "Python", "PostgreSQL",
    "Redis", "Docker", "AWS", "GraphQL", "Git",
  ],
  projects: [
    {
      id:           "proj-1",
      name:         "OpenMetrics Dashboard",
      description:  "Real-time analytics dashboard with WebSocket-powered live updates, custom charting, and multi-tenant architecture. Serves 500+ daily active users.",
      technologies: "React, D3.js, Node.js, WebSockets",
      url:          "github.com/alexj/openmetrics",
    },
  ],
};

// ─── Templates ────────────────────────────────────────────────────────────────
export const TEMPLATES = [
  { id: "modern",    label: "Modern",    description: "Clean split layout with bold typography" },
  { id: "classic",   label: "Classic",   description: "Traditional single-column elegance" },
  { id: "minimal",   label: "Minimal",   description: "Ultra-clean, whitespace-forward design" },
];

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "SET_PERSONAL":
      return { ...state, personal: { ...state.personal, ...action.payload } };
    case "SET_EDUCATION":
      return { ...state, education: action.payload };
    case "SET_EXPERIENCE":
      return { ...state, experience: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "RESET":
      return INITIAL_RESUME;
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resume, dispatch] = useReducer(reducer, INITIAL_RESUME);

  const setPersonal    = useCallback((data) => dispatch({ type: "SET_PERSONAL",    payload: data }), []);
  const setEducation   = useCallback((data) => dispatch({ type: "SET_EDUCATION",   payload: data }), []);
  const setExperience  = useCallback((data) => dispatch({ type: "SET_EXPERIENCE",  payload: data }), []);
  const setSkills      = useCallback((data) => dispatch({ type: "SET_SKILLS",      payload: data }), []);
  const setProjects    = useCallback((data) => dispatch({ type: "SET_PROJECTS",    payload: data }), []);
  const resetResume    = useCallback(()     => dispatch({ type: "RESET" }),                          []);

  return (
    <ResumeContext.Provider value={{ resume, setPersonal, setEducation, setExperience, setSkills, setProjects, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
