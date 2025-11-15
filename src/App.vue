<script setup lang="ts">
import TaskForm from "./components/taskForm.vue";
import TaskList from "./components/taskList.vue";
</script>

<template>
  <div class="max-w-xl mx-auto p-4 space-y-6">
    <h1 class="text-2xl font-bold">Lista de Tarefas</h1>
    <TaskForm />
    <TaskList />
  </div>
</template>

<style scoped></style>
