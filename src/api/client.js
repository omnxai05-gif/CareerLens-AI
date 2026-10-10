import axios from "axios";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const TOKEN_KEY = "cl_token";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !location.pathname.startsWith("/login")) {
      localStorage.removeItem(TOKEN_KEY);
      location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Turn any axios / mock error into a readable string
export const errorMessage = (err) =>
  err?.response?.data?.detail
    ? typeof err.response.data.detail === "string"
      ? err.response.data.detail
      : err.response.data.detail.map?.((d) => d.msg).join(", ")
    : err?.message || "Something went wrong";

export default client;
