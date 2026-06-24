<template>
  <div class="flex flex-col items-center justify-center py-12 gap-4">
    <div class="relative w-12 h-12">
      <div class="absolute inset-0 rounded-full border-4 border-blue-100"></div>
      <div
        class="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"
      ></div>
    </div>
    <span class="text-slate-500 text-sm">{{ text }}</span>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Loader",
  props: {
    text: {
      type: String,
      default: "Loading...",
    },
  },
};
</script>
