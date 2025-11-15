<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "../stores/task";

const store = useTasksStore();
const title = ref("");
const description = ref("");

function submit() {
  if (!title.value.trim()) return;
  store.addTask({
    id: Date.now(),
    title: title.value,
    description: description.value,
    is_completed: false,
  });
  title.value = "";
  description.value = "";
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-2">
    <input v-model="title" placeholder="Título" class="border p-2 w-full" />
    <textarea
      v-model="description"
      placeholder="Descrição"
      class="border p-2 w-full"
    />
    <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded">
      Adicionar
    </button>
  </form>
</template>
