import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// attach the JWT to every request
api.interceptors.request.use((config) => {
  try {
    const stored = JSON.parse(sessionStorage.getItem("user"));
    if (stored?.token) {
      config.headers.Authorization = `Bearer ${stored.token}`;
    }
  } catch { /* ignore bad/missing storage */ }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    // don't bounce to /login if the failing call IS the login/register flow
    if (error.response?.status === 401 && !url.includes("/users/login")) {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
