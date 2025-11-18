<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  initialTitle?: string;
  initialDescription?: string;
  pending: boolean;
}>();

const emit = defineEmits<{
  (event: "save", payload: { title: string; description: string }): void;
  (event: "cancel"): void;
}>();

const title = ref(props.initialTitle ?? "");
const description = ref(props.initialDescription ?? "");

watch(
  () => [props.initialTitle, props.initialDescription],
  ([t, d]) => {
    title.value = t ?? "";
    description.value = d ?? "";
  }
);

function onSave() {
  emit("save", { title: title.value, description: description.value });
}

function onCancel() {
  emit("cancel");
}
</script>

<template>
  <div class="space-y-3">
    <input
      v-model="title"
      class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition"
    />
    <textarea
      v-model="description"
      class="w-full rounded-lg border border-gray-300 bg-white/80 p-3 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/40 transition min-h-24"
    />
    <div class="flex gap-2">
      <button
        class="rounded-lg bg-green-600 text-white px-4 py-2 font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition"
        :disabled="pending"
        @click="onSave"
      >
        Salvar
      </button>
      <button
        class="rounded-lg bg-gray-200 text-gray-900 px-4 py-2 font-medium shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/40 transition"
        @click="onCancel"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>
