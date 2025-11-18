<script setup lang="ts">
import { ref } from "vue";
import editorTaskForm from "./editorTaskForm.vue";
import type { Task } from "../types/taskType";

const props = defineProps<{
  task: Task;
  pending: boolean;
}>();

const emit = defineEmits<{
  (event: "toggle", payload: { id: string; is_completed: boolean }): void;
  (event: "remove", payload: { id: string }): void;
  (
    event: "save",
    payload: { id: string; title: string; description: string }
  ): void;
}>();

const editing = ref(false);
const title = ref("");
const description = ref("");

function startEdit() {
  editing.value = true;
  title.value = props.task.title;
  description.value = props.task.description;
}

function save(values: { title: string; description: string }) {
  emit("save", {
    id: props.task.id,
    title: values.title,
    description: values.description,
  });
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
}
</script>

<template>
  <li
    class="rounded-xl border bg-white/80 p-4 shadow-sm hover:shadow-md transition flex items-start gap-4"
  >
    <input
      type="checkbox"
      :checked="props.task.is_completed"
      @change="
        emit('toggle', {
          id: props.task.id,
          is_completed: !props.task.is_completed,
        })
      "
      :disabled="props.pending"
      class="mt-1 h-5 w-5"
    />
    <div class="flex-1">
      <editorTaskForm
        v-if="editing"
        :initial-title="title"
        :initial-description="description"
        :pending="props.pending"
        @save="save"
        @cancel="cancelEdit"
      />
      <div v-else class="space-y-1">
        <div
          class="font-semibold transition-colors"
          :class="{ 'line-through text-gray-500': props.task.is_completed }"
        >
          {{ props.task.title }}
        </div>
        <div class="text-sm text-gray-600">{{ props.task.description }}</div>
      </div>
    </div>
    <div v-if="!editing" class="flex flex-col gap-2">
      <button
        class="rounded-lg bg-amber-500 text-white px-3 py-2 font-medium shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
        @click="startEdit"
      >
        Editar
      </button>
      <button
        class="rounded-lg bg-red-600 text-white px-3 py-2 font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition"
        :disabled="props.pending"
        @click="emit('remove', { id: props.task.id })"
      >
        Remover
      </button>
    </div>
  </li>
</template>
