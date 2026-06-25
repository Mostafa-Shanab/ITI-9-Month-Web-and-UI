<template>
  <div class="space-y-12">
    <div
      class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white shadow-xl py-16 px-8 sm:px-12 md:py-20 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div class="max-w-2xl space-y-6">
        <span
          class="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider"
        >
          Local Database
        </span>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent"
        >
          Manage Your Storefront with Ease.
        </h1>
        <p
          class="text-blue-200 text-base sm:text-lg max-w-xl font-light leading-relaxed"
        >
          Full CRUD operations against a local json-server database. Add, edit,
          view, and delete products from a single clean interface.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2"
        >
          <router-link
            to="/products"
            class="w-full sm:w-auto text-center px-8 py-3.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Browse Products
          </router-link>
          <router-link
            to="/add"
            class="w-full sm:w-auto text-center px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700 border border-blue-500/35 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Add New Item
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Home",
};
</script>
