"use client";

import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to headers
httpClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (!token && typeof window !== "undefined") {
      window.location.href = "/login";
      return Promise.reject(new Error("No token found"));
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Delete token cookie
      deleteCookie("token");

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
