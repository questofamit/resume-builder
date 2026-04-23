# 📄 ResumeForge — Full-Stack Resume Builder

A production-ready, full-stack resume builder web app built with **React + Node.js/Express**.  
Generate professional PDF and DOCX resumes with live preview and 3 beautiful templates.

---

## 🗂 Project Structure

```
resume-builder/
├── frontend/                  # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form/          # Section forms (Personal, Education, etc.)
│   │   │   ├── Templates/     # Resume templates (Modern, Classic, Minimal)
│   │   │   ├── UI/            # Reusable UI components
│   │   │   └── ResumePreview.jsx
│   │   ├── context/           # ResumeContext (global state)
│   │   ├── hooks/             # useDownload hook
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── vercel.json
│
└── backend/                   # Express API
    ├── src/
    │   ├── generators/
    │   │   ├── pdfGenerator.js   # pdf-lib PDF generation
    │   │   └── docxGenerator.js  # docx package DOCX generation
    │   ├── routes/
    │   │   └── resume.js         # POST /pdf, /docx, /validate
    │   └── utils/
    │       └── validation.js     # Input sanitization & validation
    ├── server.js
    └── render.yaml
```

---

## 🚀 Local Setup (Step-by-Step)

### Prerequisites
- **Node.js** v18+ (run `node -v` to check)
- **npm** v9+ (comes with Node.js)
- A terminal / command prompt

---

### 1. Clone / Download the Project

```bash
git clone https://github.com/yourname/resume-builder.git
cd resume-builder
```

---

### 2. Set Up the Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# (Optional) Edit .env to change port or add frontend URL
# The defaults work fine for local development

# Start the backend dev server
npm run dev
```

✅ You should see: `Resume Builder API running on http://localhost:3001`

**Backend endpoints:**
| Method | Path                    | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/resume/pdf`       | Generate and download PDF |
| POST   | `/api/resume/docx`      | Generate and download DOCX |
| POST   | `/api/resume/validate`  | Validate resume JSON   |
| GET    | `/health`               | Health check           |

---

### 3. Set Up the Frontend

Open a **new terminal tab**:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# VITE_API_URL is already set to http://localhost:3001/api

# Start the frontend dev server
npm run dev
```

✅ Open your browser at **http://localhost:5173**

---

## 🌐 Deployment Guide

### Deploy Backend → Render (Free Tier)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo → select the `backend/` folder as root  
   *(or set Root Directory to `backend` in settings)*
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add environment variable:
   - `FRONTEND_URL` = `https://your-app.vercel.app`
6. Click **Deploy**

> ⚠️ Free tier on Render spins down after 15 min of inactivity.  
> Upgrade to Starter ($7/mo) for always-on hosting.

---

### Deploy Frontend → Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Click **Deploy**

> Vercel auto-deploys on every `git push` to main. Zero config needed.

---

### Alternative: Railway (Backend)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
cd backend
railway login
railway init
railway up
```

Then set `FRONTEND_URL` env var in the Railway dashboard.

---

## 📦 Resume JSON Format

The API accepts this JSON structure:

```json
{
  "personal": {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "phone": "+1 (555) 000-1234",
    "location": "San Francisco, CA",
    "linkedin": "linkedin.com/in/alexjohnson",
    "website": "alexjohnson.dev",
    "summary": "Full-stack engineer with 5+ years..."
  },
  "experience": [
    {
      "company": "Stripe",
      "position": "Senior Software Engineer",
      "startDate": "Jan 2022",
      "endDate": "",
      "current": true,
      "description": "Led backend refactor reducing API latency by 40%\nBuilt fraud detection pipeline"
    }
  ],
  "education": [
    {
      "institution": "UC Berkeley",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "startDate": "Aug 2015",
      "endDate": "May 2019",
      "gpa": "3.8"
    }
  ],
  "skills": ["TypeScript", "React", "Node.js", "PostgreSQL"],
  "projects": [
    {
      "name": "OpenMetrics",
      "description": "Real-time analytics dashboard...",
      "technologies": "React, D3.js, Node.js",
      "url": "github.com/alexj/openmetrics"
    }
  ]
}
```

---

## 🧪 Testing the API Manually

```bash
# Test PDF generation (saves to resume.pdf)
curl -X POST http://localhost:3001/api/resume/pdf \
  -H "Content-Type: application/json" \
  -d '{"personal":{"name":"Jane Doe","email":"jane@test.com"}}' \
  --output resume.pdf

# Test DOCX generation
curl -X POST http://localhost:3001/api/resume/docx \
  -H "Content-Type: application/json" \
  -d '{"personal":{"name":"Jane Doe","email":"jane@test.com"}}' \
  --output resume.docx

# Validate data
curl -X POST http://localhost:3001/api/resume/validate \
  -H "Content-Type: application/json" \
  -d '{"personal":{"name":"Jane Doe","email":"jane@test.com"}}'
```

---

## 💅 Adding a 4th Template

1. Create `frontend/src/components/Templates/ExecutiveTemplate.jsx`  
   (Copy `MinimalTemplate.jsx` as a starting point)
2. Register it in `ResumePreview.jsx`:
   ```js
   import ExecutiveTemplate from "./Templates/ExecutiveTemplate";
   const TEMPLATE_MAP = { ..., executive: ExecutiveTemplate };
   ```
3. Add to `ResumeContext.jsx`:
   ```js
   export const TEMPLATES = [
     ...,
     { id: "executive", label: "Executive", description: "Bold leadership style" }
   ];
   ```

---

## 💰 Monetization Strategies

### 🆓→💳 Freemium Model (Recommended to start)
| Feature            | Free | Pro ($5/mo) | Teams ($19/mo) |
|--------------------|------|-------------|----------------|
| Templates          | 3    | 10+         | 10+            |
| PDF downloads      | 3/mo | Unlimited   | Unlimited      |
| DOCX downloads     | ✗    | ✅          | ✅             |
| Custom colors      | ✗    | ✅          | ✅             |
| Cover letter tool  | ✗    | ✅          | ✅             |
| Team seats         | ✗    | ✗           | 5 seats        |

**Implementation:** Add Stripe Checkout + a simple auth layer (Clerk.dev is free up to 10k MAU).

---

### 🏷 One-Time Payment
- Sell a "Lifetime Pro" pass at **$19–29** via Gumroad or Stripe Payment Links
- No subscription management complexity

---

### 📋 Template Marketplace
- Let designers submit premium templates
- Charge $3–5 per template, split 70/30 with creators
- Use a simple admin panel + Stripe Connect

---

### 🤖 AI Enhancement (High-value add-on)
Add a "Rewrite with AI" button using the Anthropic API:
```js
// Improve bullet points
const improved = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "x-api-key": process.env.ANTHROPIC_KEY, "anthropic-version": "2023-06-01" },
  body: JSON.stringify({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [{ role: "user", content: `Rewrite this resume bullet more impactfully: "${bullet}"` }]
  })
});
```
Charge **$1 per AI rewrite credit** or include 20 credits in Pro.

---

### 📈 Growth Tactics
1. **SEO landing pages:** "Free Resume Builder for [Job Title]" — target 100+ niches
2. **Resume review service:** Charge $15–30 for human expert review (use Calendly + Stripe)
3. **ATS Score Checker:** Parse job descriptions, rate resume match (OpenAI API)
4. **LinkedIn integration:** Auto-fill from LinkedIn profile via their API
5. **Affiliate program:** Pay 30% recurring to bloggers/career coaches who refer users

---

## 🛡 Security Notes

- All user input is sanitized (strips `<>` to prevent XSS injection in PDFs)
- Rate limiting: 50 requests per IP per 15 minutes
- CORS whitelist prevents unauthorized origins
- Input size limit: 1MB per request
- No data is stored server-side (stateless API)

---

## 📋 Roadmap / Future Features

- [ ] User accounts + saved resumes (Supabase)
- [ ] Cover letter generator
- [ ] LinkedIn profile import
- [ ] ATS keyword analyzer
- [ ] AI bullet point enhancer (Claude API)
- [ ] Custom color themes per template
- [ ] Multi-page resume support
- [ ] Resume sharing via public link
- [ ] Analytics dashboard (views, downloads)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit with conventional commits: `git commit -m "feat: add new template"`
4. Push and open a Pull Request

---

## 📄 License

MIT — free for personal and commercial use.

---

Built with ❤️ using React, Node.js, pdf-lib, and docx.
