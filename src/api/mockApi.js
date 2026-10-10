// A fake backend that lives in the browser (localStorage).
// It has the SAME function names + return shapes as realApi.js,
// so switching to FastAPI later needs no page changes.
import {
  DEFAULT_RESUME_SKILLS,
  JOBS,
  LEARNING,
  SKILL_KEYWORDS,
  TARGET_ROLE,
} from "./mockData.js";

const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms));
const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const fail = (detail) => Promise.reject({ response: { data: { detail } } });

// ---------- derived data ----------
const stepId = (skill, i) => `${skill}-${i}`;

function buildPath() {
  const resume = read("cl_resume", null);
  const have = resume?.skills || [];
  const done = new Set(read("cl_done", []));
  const gaps = TARGET_ROLE.required.filter((s) => !have.includes(s));

  const steps = gaps.flatMap((skill) =>
    (LEARNING[skill] || []).map(([title, duration, url], i) => ({
      id: stepId(skill, i),
      skill,
      title,
      duration,
      url,
      done: done.has(stepId(skill, i)),
    }))
  );
  return { have, gaps, steps };
}

function buildSkillGap() {
  const { have, gaps, steps } = buildPath();
  const gapList = gaps.map((name) => {
    const mine = steps.filter((s) => s.skill === name);
    const progress = mine.length
      ? Math.round((mine.filter((s) => s.done).length / mine.length) * 100)
      : 0;
    return { name, progress };
  });
  const total = TARGET_ROLE.required.length;
  const partial = gapList.reduce((sum, g) => sum + g.progress / 100, 0);
  const readiness = Math.round(((have.length + partial) / total) * 100);
  const priority = (p) => (p < 34 ? "High" : p < 67 ? "Medium" : "Low");
  return {
    target_role: TARGET_ROLE.name,
    readiness,
    skills: have,
    gaps: gapList
      .map((g) => ({ ...g, priority: priority(g.progress) }))
      .sort((a, b) => a.progress - b.progress),
  };
}

function buildJobs() {
  const have = read("cl_resume", null)?.skills || [];
  const saved = new Set(read("cl_saved", []));
  return JOBS.map((j) => {
    const matched = j.skills.filter((s) => have.includes(s));
    return {
      ...j,
      matched_skills: matched,
      missing_skills: j.skills.filter((s) => !have.includes(s)),
      match: Math.round((matched.length / j.skills.length) * 100),
      saved: saved.has(j.id),
    };
  }).sort((a, b) => b.match - a.match);
}

// ---------- API ----------
export const mockApi = {
  async signup({ name, email, password }) {
    await wait();
    const users = read("cl_users", []);
    if (users.some((u) => u.email === email.toLowerCase()))
      return fail("An account with this email already exists");
    const user = { id: Date.now(), name, email: email.toLowerCase() };
    write("cl_users", [...users, { ...user, password }]);
    return { access_token: `mock-${user.id}`, user };
  },

  async login({ email, password }) {
    await wait();
    const found = read("cl_users", []).find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );
    if (!found) return fail("Invalid email or password");
    const { password: _pw, ...user } = found;
    return { access_token: `mock-${user.id}`, user };
  },

  async me() {
    const token = localStorage.getItem("cl_token") || "";
    const id = Number(token.replace("mock-", ""));
    const found = read("cl_users", []).find((u) => u.id === id);
    if (!found) return Promise.reject({ response: { status: 401, data: { detail: "Not authenticated" } } });
    const { password: _pw, ...user } = found;
    return user;
  },

  async getResume() {
    await wait(250);
    return read("cl_resume", null);
  },

  async uploadResume(file) {
    await wait(1400); // pretend the AI is analysing it
    let skills = [];
    if (file.type.startsWith("text/") || file.name.endsWith(".txt")) {
      const text = (await file.text()).toLowerCase();
      skills = Object.entries(SKILL_KEYWORDS)
        .filter(([, words]) => words.some((w) => text.includes(w)))
        .map(([name]) => name);
    }
    // PDF/DOCX are parsed by your FastAPI backend later. Demo uses sample skills.
    if (!skills.length) skills = DEFAULT_RESUME_SKILLS;
    const resume = {
      filename: file.name,
      size: file.size,
      uploaded_at: new Date().toISOString(),
      skills,
    };
    write("cl_resume", resume);
    write("cl_done", []);
    return resume;
  },

  async getDashboard() {
    await wait(300);
    const gap = buildSkillGap();
    const jobs = buildJobs();
    return {
      readiness: gap.readiness,
      skills: gap.skills,
      gaps: gap.gaps,
      job_matches: jobs.filter((j) => j.match >= 40).length,
      has_resume: !!read("cl_resume", null),
    };
  },

  async getSkillGap() {
    await wait(300);
    return { ...buildSkillGap(), has_resume: !!read("cl_resume", null) };
  },

  async getJobs() {
    await wait(300);
    return { has_resume: !!read("cl_resume", null), jobs: buildJobs() };
  },

  async toggleSaveJob(id) {
    const saved = new Set(read("cl_saved", []));
    saved.has(id) ? saved.delete(id) : saved.add(id);
    write("cl_saved", [...saved]);
    return { saved: saved.has(id) };
  },

  async getLearningPath() {
    await wait(300);
    const { steps } = buildPath();
    return {
      target_role: TARGET_ROLE.name,
      has_resume: !!read("cl_resume", null),
      steps,
    };
  },

  async setStepDone(id, done) {
    const set = new Set(read("cl_done", []));
    done ? set.add(id) : set.delete(id);
    write("cl_done", [...set]);
    return { id, done };
  },
};
