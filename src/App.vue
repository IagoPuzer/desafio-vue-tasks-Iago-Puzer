<script setup lang="ts">
import createTaskForm from "./components/createTaskForm.vue";
import listTasks from "./components/listTasks.vue";
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div class="max-w-2xl mx-auto p-6">
      <div
        class="rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg p-6 space-y-6"
      >
        <h1 class="text-3xl font-bold tracking-tight">Lista de Tarefas</h1>
        <createTaskForm />
        <listTasks />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
