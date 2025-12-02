"use client";

import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config;
    }

    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("token");

      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
