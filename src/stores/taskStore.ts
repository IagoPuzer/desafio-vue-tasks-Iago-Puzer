import { defineStore } from "pinia";
import type { Task } from "../types/taskType";
import {
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} from "../services/tasksServices";

export const useTasksStore = defineStore("tasks", {
  state: (): { tasks: Task[] } => ({
    tasks: [],
  }),
  actions: {
    fetchTasks(): Promise<Task[]> {
      return getTasks()
        .then((tasks: Task[]) => {
          this.tasks = tasks;
          return tasks;
        })
        .catch((error) => Promise.reject(error));
    },
    addTask(task: Omit<Task, "id">): Promise<Task> {
      return createTasks(task)
        .then((created: Task) => {
          this.tasks.push(created);
          return created;
        })
        .catch((error) => Promise.reject(error));
    },
    removeTask(id: string): Promise<void> {
      return deleteTasks(id)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        })
        .catch((error) => Promise.reject(error));
    },
    updateTask(task: Task): Promise<Task> {
      return updateTasks(task)
        .then((updated: Task) => {
          const index = this.tasks.findIndex((t) => t.id === updated.id);
          if (index !== -1) {
            this.tasks[index] = updated;
          }
          return updated;
        })
        .catch((error) => Promise.reject(error));
    },
  },
});
