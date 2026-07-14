import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/task-comments`;

export const getTaskComments = async (taskId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTaskComment = async (taskId, message) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
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
