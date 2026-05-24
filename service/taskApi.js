import axios from "axios";

export const getMyTasks = async () => {
  const response = await axios.get("http://localhost:5002/tasks/my-tasks");

  return response.data;
};
