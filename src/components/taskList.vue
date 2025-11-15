<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "../stores/task";
import type { Task } from "../types/taskType";

const store = useTasksStore();
const editingId = ref<number | null>(null);
const editTitle = ref("");
const editDescription = ref("");

function startEdit(task: Task) {
  editingId.value = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;
}

function saveEdit(task: Task) {
  store.updateTask({
    ...task,
    title: editTitle.value,
    description: editDescription.value,
  });
  editingId.value = null;
}

function cancelEdit() {
  editingId.value = null;
}
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="task in store.tasks"
      :key="task.id"
      class="border p-2 flex items-start gap-3"
    >
      <input
        type="checkbox"
        :checked="task.is_completed"
        @change="
          store.updateTask({ ...task, is_completed: !task.is_completed })
        "
      />
      <div class="flex-1">
        <div v-if="editingId === task.id" class="space-y-2">
          <input v-model="editTitle" class="border p-2 w-full" />
          <textarea v-model="editDescription" class="border p-2 w-full" />
          <div class="flex gap-2">
            <button
              class="bg-green-600 text-white px-3 py-1 rounded"
              @click="saveEdit(task)"
            >
              Salvar
            </button>
            <button class="bg-gray-300 px-3 py-1 rounded" @click="cancelEdit">
              Cancelar
            </button>
          </div>
        </div>
        <div v-else>
          <div
            class="font-semibold"
            :class="{ 'line-through text-gray-500': task.is_completed }"
          >
            {{ task.title }}
          </div>
          <div class="text-sm text-gray-700">{{ task.description }}</div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <button
          class="bg-yellow-500 text-white px-3 py-1 rounded"
          @click="startEdit(task)"
        >
          Editar
        </button>
        <button
          class="bg-red-600 text-white px-3 py-1 rounded"
          @click="store.removeTask(task.id)"
        >
          Remover
        </button>
      </div>
    </li>
  </ul>
</template>
