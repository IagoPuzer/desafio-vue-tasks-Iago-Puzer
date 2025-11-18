<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "../stores/taskStore";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const store = useTasksStore();
const title = ref("");
const description = ref("");
const toast = useToast();

function submit() {
  if (!title.value.trim()) {
    toast.error("O título da tarefa é obrigatório!");
    return;
  }
  store
    .addTask({
      title: title.value,
      description: description.value,
      is_completed: false,
    })
    .then(() => {
      toast.success("Tarefa adicionada com sucesso!");
      title.value = "";
      description.value = "";
    })
    .catch(() => {
      toast.error("Erro ao adicionar tarefa");
    });
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="title"
      placeholder="Título"
      class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition"
    />
    <textarea
      v-model="description"
      placeholder="Descrição"
      class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition min-h-24"
    />
    <button
      type="submit"
      class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-[0.99] transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
      :disabled="!!store.error"
    >
      Adicionar
    </button>
  </form>
</template>
