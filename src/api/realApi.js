// Real FastAPI calls. Your backend must return the same JSON shapes
// as mockApi.js. See README.md -> "FastAPI contract".
import client from "./client.js";

const data = (p) => p.then((r) => r.data);

export const realApi = {
  signup: (body) => data(client.post("/auth/signup", body)),
  login: (body) => data(client.post("/auth/login", body)),
  me: () => data(client.get("/auth/me")),

  getResume: () => data(client.get("/resume")),
  uploadResume: (file) => {
    const form = new FormData();
    form.append("file", file);
    return data(client.post("/resume/upload", form));
  },

  getDashboard: () => data(client.get("/dashboard")),
  getSkillGap: () => data(client.get("/skill-gap")),
  getJobs: () => data(client.get("/jobs")),
  toggleSaveJob: (id) => data(client.post(`/jobs/${id}/save`)),

  getLearningPath: () => data(client.get("/learning-path")),
  setStepDone: (id, done) =>
    data(client.patch(`/learning-path/steps/${id}`, { done })),
};
