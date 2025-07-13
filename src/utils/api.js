import axios from "axios";

const api = axios.create({
  baseURL: " https://task-manager-backend-q8kw.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

//automatically include token in request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
