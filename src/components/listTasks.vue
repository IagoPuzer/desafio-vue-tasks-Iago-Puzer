<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTasksStore } from "../stores/taskStore";
import TaskFilters from "./tasksFilter.vue";
import TaskListItem from "./listTaskItem.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const store = useTasksStore();
const toast = useToast();

onMounted(() => {
  store.fetchTasks().catch(() => {
    toast.error("Erro ao carregar tarefas");
  });
});

const filter = ref<"all" | "completed" | "pending">("all");
const filteredTasks = computed(() => {
  if (filter.value === "completed")
    return store.tasks.filter((task) => task.is_completed);
  if (filter.value === "pending")
    return store.tasks.filter((task) => !task.is_completed);
  return store.tasks;
});

function handleSave(payload: {
  id: string;
  title: string;
  description: string;
}) {
  const task = store.tasks.find((task) => task.id === payload.id);
  if (!task) return;
  store
    .updateTask({
      ...task,
      title: payload.title,
      description: payload.description,
    })
    .then(() => {
      toast.success("Tarefa atualizada com sucesso!");
    })
    .catch(() => {
      toast.error("Erro ao atualizar tarefa");
    });
}

function handleToggle(payload: { id: string; is_completed: boolean }) {
  const task = store.tasks.find((t) => t.id === payload.id);
  if (!task) return;
  store
    .updateTask({
      ...task,
      is_completed: payload.is_completed,
    })
    .then(() => {
      if (payload.is_completed) {
        toast.success("Tarefa concluída!");
      } else {
        toast.info("Tarefa pendente!");
      }
    })
    .catch(() => {
      toast.error("Erro ao atualizar status da tarefa");
    });
}

function handleRemove(payload: { id: string }) {
  store
    .removeTask(payload.id)
    .then(() => {
      toast.success("Tarefa removida com sucesso!");
    })
    .catch(() => {
      toast.error("Erro ao remover tarefa");
    });
}
</script>

<template>
  <div class="space-y-3">
    <TaskFilters v-model="filter" />
    <div
      v-if="store.isLoading"
      class="rounded-xl border bg-white/70 p-6 text-center text-gray-600"
    >
      Carregando tarefas...
    </div>
    <div
      v-else-if="store.error"
      class="rounded-xl border bg-red-50 p-6 text-center text-red-700"
    >
      Erro ao carregar Tasks
    </div>
    <div
      v-else-if="filteredTasks.length === 0"
      class="rounded-xl border border-dashed bg-white/70 p-6 text-center text-gray-600"
    >
      Nenhuma tarefa ainda. Adicione uma nova acima.
    </div>
    <ul v-else class="space-y-3">
      <TaskListItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :pending="store.pendingIds.includes(task.id)"
        @toggle="handleToggle"
        @save="handleSave"
        @remove="handleRemove"
      />
    </ul>
  </div>
</template>
