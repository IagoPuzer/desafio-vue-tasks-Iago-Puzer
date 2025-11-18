<script setup lang="ts">
const props = defineProps<{
  modelValue: "all" | "completed" | "pending";
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: "all" | "completed" | "pending"): void;
}>();
function setFilter(value: "all" | "completed" | "pending") {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="flex gap-2">
    <button
      class="px-3 py-2 rounded-lg"
      :class="
        modelValue === 'all'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-900'
      "
      @click="setFilter('all')"
    >
      Todas
    </button>
    <button
      class="px-3 py-2 rounded-lg"
      :class="
        modelValue === 'completed'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-900'
      "
      @click="setFilter('completed')"
    >
      Concluídas
    </button>
    <button
      class="px-3 py-2 rounded-lg"
      :class="
        modelValue === 'pending'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-900'
      "
      @click="setFilter('pending')"
    >
      Pendentes
    </button>
  </div>
</template>
