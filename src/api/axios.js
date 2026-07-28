import axios from "axios";

// 1. In-memory variable (Refresh pe ye automatic reset/null ho jayega)
let inMemoryToken = null;

// 2. Helper function taaki Context se token yahan set kiya ja sake
export const setAuthToken = (token) => {
  inMemoryToken = token;
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    // 3. Request me in-memory token bhejo
    if (inMemoryToken) {
      config.headers.Authorization = `Bearer ${inMemoryToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;