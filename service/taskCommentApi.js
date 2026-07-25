import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/task-comments`;

// Create axios instance with interceptor for 401 handling
const api = axios.create();

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

export const getTaskComments = async (taskId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`${BASE_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTaskComment = async (taskId, message) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `${BASE_URL}/${taskId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
