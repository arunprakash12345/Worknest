import axios from "axios";

export const getMyTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks/my-tasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
