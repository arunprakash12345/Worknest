import axios from "axios";

// Create axios instance with interceptor for 401 handling
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Response interceptor to handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("unauthorized", { detail: { status: 401 } }));
    }
    return Promise.reject(error);
  }
);

export const getMyTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/tasks/my-tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
