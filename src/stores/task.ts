import { defineStore } from "pinia";
import type { Task } from "../types/taskType";

const STORAGE_KEY = "tasks";

function load(): Task[] {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
}

function save(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: load(),
  }),
  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
      save(this.tasks);
    },
    removeTask(id: number): void {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      save(this.tasks);
    },
    updateTask(task: Task): void {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
        save(this.tasks);
      }
    },
  },
});
