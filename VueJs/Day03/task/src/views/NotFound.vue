<template>
  <div
    class="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div
      class="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"
    ></div>
    <div
      class="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"
    ></div>

    <div class="max-w-md text-center space-y-6 relative z-10">
      <div
        class="text-5xl font-extrabold text-blue-500 uppercase tracking-widest"
      >
        Error
      </div>

      <h1
        class="text-9xl font-black bg-gradient-to-r from-blue-400 via-blue-200 to-blue-600 bg-clip-text text-transparent leading-none select-none"
      >
        404
      </h1>

      <div class="space-y-2">
        <h2 class="text-2xl font-bold">Page Not Found</h2>
        <p class="text-slate-400 text-sm leading-relaxed">
          The page you are looking for does not exist or has been removed.
        </p>
      </div>

      <router-link
        to="/"
        class="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl shadow-lg transition-all duration-300 text-sm"
      >
        Return to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
