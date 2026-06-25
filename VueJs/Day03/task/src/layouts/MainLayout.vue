<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-8 max-w-7xl">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>
