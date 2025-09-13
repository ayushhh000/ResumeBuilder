// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    // Do NOT attach token for register or login endpoints
    if (
      accessToken &&
      !config.url.includes("/register") &&
      !config.url.includes("/login")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const url = error.config?.url || "";

      // Only redirect on 401 for protected routes
      if (
        status === 401 &&
        !url.includes("/register") &&
        !url.includes("/login")
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else if (status === 500) {
        console.error("Server Error:", error.response.data);
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
