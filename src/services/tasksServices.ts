import axios from "axios";
import type { Task } from "../types/taskType";

export const getTasks = () => {
  return axios
    .get("/Tasks")
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const createTask = (task: Omit<Task, "id">) => {
  return axios
    .post("/Tasks", task)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const updateTask = (task: Task) => {
  return axios
    .put(`/Tasks/${task.id}`, task)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const deleteTask = (id: string) => {
  return axios
    .delete(`/Tasks/${id}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};
