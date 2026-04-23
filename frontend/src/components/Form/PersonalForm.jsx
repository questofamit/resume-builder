/**
 * Personal Info Form Section
 */
import React from "react";
import { useResume } from "../../context/ResumeContext";
import { Input, Textarea, SectionCard } from "../UI";

export default function PersonalForm() {
  const { resume, setPersonal } = useResume();
  const p = resume.personal;

  const handle = (field) => (e) => setPersonal({ [field]: e.target.value });

  return (
    <SectionCard title="Personal Information" icon="👤">
      <div style={grid2}>
        <Input
          label="Full Name *"
          id="name"
          value={p.name}
          onChange={handle("name")}
          placeholder="Alex Johnson"
          required
        />
        <Input
          label="Email Address *"
          id="email"
          type="email"
          value={p.email}
          onChange={handle("email")}
          placeholder="alex@example.com"
          required
        />
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          value={p.phone}
          onChange={handle("phone")}
          placeholder="+1 (555) 000-1234"
        />
        <Input
          label="Location"
          id="location"
          value={p.location}
          onChange={handle("location")}
          placeholder="San Francisco, CA"
        />
        <Input
          label="LinkedIn"
          id="linkedin"
          value={p.linkedin}
          onChange={handle("linkedin")}
          placeholder="linkedin.com/in/yourname"
        />
        <Input
          label="Website / Portfolio"
          id="website"
          value={p.website}
          onChange={handle("website")}
          placeholder="yourname.dev"
        />
      </div>
      <Textarea
        label="Professional Summary"
        id="summary"
        value={p.summary}
        onChange={handle("summary")}
        placeholder="A brief 2–3 sentence overview of your background and strengths…"
        rows={3}
        hint="Keep it under 3 sentences. Focus on your top value proposition."
      />
    </SectionCard>
  );
}

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 12,
};
