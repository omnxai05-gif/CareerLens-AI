import { USE_MOCK } from "./client.js";
import { mockApi } from "./mockApi.js";
import { realApi } from "./realApi.js";

// Pages only import from here. Flip VITE_USE_MOCK in .env to switch.
export const api = USE_MOCK ? mockApi : realApi;
export { errorMessage } from "./client.js";
