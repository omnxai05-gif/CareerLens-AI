# CareerLens AI

AI-powered resume analyzer and career skill-gap website.

## Status
- Frontend: Completed (React.js + Tailwind CSS)
- Backend: In progress (Python + FastAPI)

## Features
- Login / Signup
- Dashboard with career readiness score
- Skill gap analysis, job matches, learning path

# CareerLens AI - Frontend (React + Tailwind)

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

By default `.env` has `VITE_USE_MOCK=true`, so **every button works with no backend**
(data is stored in your browser). Sign up, upload a resume, open Skill Gap, Jobs, Learning Path.

Tip: in mock mode a `.txt` resume that mentions words like "python", "docker", "aws"
gets those skills detected. PDF/DOCX use sample skills until your FastAPI parses them.

## Folder structure

```
src/
  api/
    client.js      axios + token + error helper
    mockData.js    demo skills, jobs, learning steps
    mockApi.js     fake backend (localStorage)
    realApi.js     real FastAPI calls
    index.js       picks mock or real from .env
  context/         AuthContext (login state), ToastContext (popups)
  hooks/useFetch.js
  components/      AppLayout (sidebar), AuthLayout, ProgressRing, Field, ...
  pages/           Login, Signup, Dashboard, MyResume, SkillGap, Jobs, LearningPath
```

## Switch to FastAPI

1. In `.env` set `VITE_USE_MOCK=false` and `VITE_API_URL=http://localhost:8000`
2. In FastAPI enable CORS for `http://localhost:5173`
3. Build these endpoints (all except auth need `Authorization: Bearer <token>`):

| Method | URL | Body | Returns |
|---|---|---|---|
| POST | /auth/signup | `{name,email,password}` | `{access_token, user:{id,name,email}}` |
| POST | /auth/login | `{email,password}` | `{access_token, user}` |
| GET | /auth/me | - | `{id,name,email}` |
| GET | /resume | - | `{filename,size,uploaded_at,skills:[..]}` or `null` |
| POST | /resume/upload | multipart `file` | same as GET /resume |
| GET | /dashboard | - | `{readiness, skills:[..], gaps:[{name,progress,priority}], job_matches, has_resume}` |
| GET | /skill-gap | - | `{target_role, readiness, skills, gaps, has_resume}` |
| GET | /jobs | - | `{has_resume, jobs:[{id,title,company,location,type,salary,skills,matched_skills,missing_skills,match,saved}]}` |
| POST | /jobs/{id}/save | - | `{saved: true/false}` |
| GET | /learning-path | - | `{target_role, has_resume, steps:[{id,skill,title,duration,url,done}]}` |
| PATCH | /learning-path/steps/{id} | `{done: bool}` | `{id, done}` |

Errors: return `{"detail": "message"}` (FastAPI default) and it shows in the UI.

## Suggested backend steps

1. Auth (JWT) + SQLite/PostgreSQL users table
2. `/resume/upload`: save file, extract text (pdfplumber / python-docx), find skills
3. Compare skills with target role -> `/skill-gap`
4. Jobs table + match % -> `/jobs`
5. AI (Claude API) to generate the learning steps -> `/learning-path`
 
🔗 **Live Demo:** [https://career-lens-ai-gfmb.vercel.app](https://career-lens-ai-gfmb.vercel.app)
