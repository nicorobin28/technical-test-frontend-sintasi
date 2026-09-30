import axios from "axios";

const API_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,

  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export async function getCsrfCookie() {
  const response = await axios.get(`${API_ORIGIN}/sanctum/csrf-cookie`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
    },
  });

  return response;
}

function getXsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
}

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();

  if (["GET", "HEAD", "OPTIONS"].includes(method)) {
    return config;
  }

  const token = getXsrfToken();
  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }

  return config;
});

let onUnauthorized = () => {};

export const setUnauthorizedHandler = (fn) => {
  onUnauthorized = fn;
};

const SILENT_401 = ["/login", "/me"];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    if (status === 419 && !config._retry) {
      config._retry = true;

      await getCsrfCookie();

      const token = getXsrfToken();

      if (token) {
        config.headers["X-XSRF-TOKEN"] = token;
      }

      return api(config);
    }

    if (status === 401 && !SILENT_401.includes(config.url)) {
      onUnauthorized();
    }

    return Promise.reject(error);
  },
);
