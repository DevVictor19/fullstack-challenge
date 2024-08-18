import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000 * 60 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
