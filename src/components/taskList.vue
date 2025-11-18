<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTasksStore } from "../stores/taskStore";
import type { Task } from "../types/taskType";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const store = useTasksStore();
const editingId = ref<string | null>(null);
const editTitle = ref("");
const editDescription = ref("");
const toast = useToast();

onMounted(() => {
  store.fetchTasks().catch(() => {
    toast.error("Erro ao carregar tarefas");
  });
});

function startEdit(task: Task) {
  editingId.value = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;
}

function saveEdit(task: Task) {
  store
    .updateTask({
      ...task,
      title: editTitle.value,
      description: editDescription.value,
    })
    .then(() => {
      toast.success("Tarefa atualizada com sucesso!");
      editingId.value = null;
    })
    .catch(() => {
      toast.error("Erro ao atualizar tarefa");
    });
}

function toggleTaskStatus(task: Task) {
  const newStatus = !task.is_completed;
  store
    .updateTask({
      ...task,
      is_completed: newStatus,
    })
    .then(() => {
      if (newStatus) {
        toast.success("Tarefa concluída!");
      } else {
        toast.info("Tarefa pendente!");
      }
    })
    .catch(() => {
      toast.error("Erro ao atualizar status da tarefa");
    });
}

function removeTask(id: string) {
  store
    .removeTask(id)
    .then(() => {
      toast.success("Tarefa removida com sucesso!");
    })
    .catch(() => {
      toast.error("Erro ao remover tarefa");
    });
}

function cancelEdit() {
  editingId.value = null;
}
</script>

<template>
  <div class="space-y-3">
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
      v-else-if="store.tasks.length === 0"
      class="rounded-xl border border-dashed bg-white/70 p-6 text-center text-gray-600"
    >
      Nenhuma tarefa ainda. Adicione uma nova acima.
    </div>
    <ul v-else class="space-y-3">
      <li
        v-for="task in store.tasks"
        :key="task.id"
        class="rounded-xl border bg-white/80 p-4 shadow-sm hover:shadow-md transition flex items-start gap-4"
      >
        <input
          type="checkbox"
          :checked="task.is_completed"
          @change="toggleTaskStatus(task)"
          :disabled="store.pendingIds.includes(task.id)"
          class="mt-1 h-5 w-5"
        />
        <div class="flex-1">
          <div v-if="editingId === task.id" class="space-y-3">
            <input
              v-model="editTitle"
              class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition"
            />
            <textarea
              v-model="editDescription"
              class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition min-h-24"
            />
            <div class="flex gap-2">
              <button
                class="rounded-lg bg-green-600 text-white px-4 py-2 font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition"
                :disabled="store.pendingIds.includes(task.id)"
                @click="saveEdit(task)"
              >
                Salvar
              </button>
              <button
                class="rounded-lg bg-gray-200 text-gray-900 px-4 py-2 font-medium shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/40 transition"
                @click="cancelEdit"
              >
                Cancelar
              </button>
            </div>
          </div>
          <div v-else class="space-y-1">
            <div
              class="font-semibold transition-colors"
              :class="{ 'line-through text-gray-500': task.is_completed }"
            >
              {{ task.title }}
            </div>
            <div class="text-sm text-gray-600">{{ task.description }}</div>
          </div>
        </div>
        <div v-if="editingId !== task.id" class="flex flex-col gap-2">
          <button
            class="rounded-lg bg-amber-500 text-white px-3 py-2 font-medium shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition"
            @click="startEdit(task)"
          >
            Editar
          </button>
          <button
            class="rounded-lg bg-red-600 text-white px-3 py-2 font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition"
            :disabled="store.pendingIds.includes(task.id)"
            @click="removeTask(task.id)"
          >
            Remover
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
