import axios from "axios";
import type { Task } from "../types/taskType";

export const getTasks = () => {
  return axios
    .get("/Tasks")
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const createTasks = (task: Omit<Task, "id">) => {
  return axios
    .post("/Tasks", task)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const updateTasks = (task: Task) => {
  return axios
    .put(`/Tasks/${task.id}`, task)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const deleteTasks = (id: string) => {
  return axios
    .delete(`/Tasks/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
