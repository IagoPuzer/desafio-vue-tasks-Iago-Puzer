import { defineStore } from "pinia";
import type { Task } from "../types/taskType";
import {
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} from "../services/tasksServices";

export const useTasksStore = defineStore("tasks", {
  state: (): {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    pendingIds: string[];
  } => ({
    tasks: [],
    isLoading: false,
    error: null,
    pendingIds: [],
  }),
  actions: {
    fetchTasks(): Promise<Task[]> {
      this.isLoading = true;
      this.error = null;
      return getTasks()
        .then((tasks: Task[]) => {
          this.tasks = tasks;
          this.isLoading = false;
          return tasks;
        })
        .catch((error) => {
          this.error = "Erro ao carregar tarefas";
          this.isLoading = false;
          return Promise.reject(error);
        });
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
      this.pendingIds.push(id);
      return deleteTasks(id)
        .then(() => {
          this.tasks = this.tasks.filter((task) => task.id !== id);
          this.pendingIds = this.pendingIds.filter((x) => x !== id);
        })
        .catch((error) => {
          this.pendingIds = this.pendingIds.filter((x) => x !== id);
          return Promise.reject(error);
        });
    },
    updateTask(task: Task): Promise<Task> {
      const id = task.id;
      this.pendingIds.push(id);
      return updateTasks(task)
        .then((updated: Task) => {
          const index = this.tasks.findIndex((t) => t.id === updated.id);
          if (index !== -1) {
            this.tasks[index] = updated;
          }
          this.pendingIds = this.pendingIds.filter((x) => x !== id);
          return updated;
        })
        .catch((error) => {
          this.pendingIds = this.pendingIds.filter((x) => x !== id);
          return Promise.reject(error);
        });
    },
  },
});
