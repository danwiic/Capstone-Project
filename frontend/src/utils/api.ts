// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Your backend base URL
  withCredentials: true, // optional: if you use cookies/auth
});

export default api;
