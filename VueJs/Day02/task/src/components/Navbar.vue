<template>
  <nav class="bg-blue-900 text-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link
          to="/"
          class="text-xl font-bold tracking-wider hover:opacity-90 transition-opacity"
        >
          VueStore
        </router-link>

        <div class="hidden md:flex space-x-2">
          <router-link
            to="/"
            exact-active-class="bg-blue-700 font-semibold"
            class="px-4 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-800 transition-colors"
          >
            Home
          </router-link>
          <router-link
            to="/products"
            active-class="bg-blue-700 font-semibold"
            class="px-4 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-800 transition-colors"
          >
            Products
          </router-link>
          <router-link
            to="/add"
            active-class="bg-blue-700 font-semibold"
            class="px-4 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-800 transition-colors"
          >
            Add Product
          </router-link>
        </div>

        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <svg
              v-if="!isOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-show="isOpen" class="md:hidden bg-blue-950 border-t border-blue-800">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          exact-active-class="bg-blue-700"
          @click="closeMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-800 transition-colors"
        >
          Home
        </router-link>
        <router-link
          to="/products"
          active-class="bg-blue-700"
          @click="closeMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-800 transition-colors"
        >
          Products
        </router-link>
        <router-link
          to="/add"
          active-class="bg-blue-700"
          @click="closeMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-800 transition-colors"
        >
          Add Product
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>
