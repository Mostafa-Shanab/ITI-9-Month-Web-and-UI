<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group"
  >
    <router-link
      :to="`/product/${product.id}`"
      class="relative pt-[65%] bg-slate-50 overflow-hidden border-b border-slate-100 block"
    >
      <img
        :src="productImage"
        :alt="product.title"
        class="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      <span
        class="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
      >
        {{ product.category || "General" }}
      </span>
    </router-link>

    <div class="p-4 flex-grow flex flex-col justify-between">
      <div>
        <router-link :to="`/product/${product.id}`" class="block">
          <h3
            class="text-sm font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors"
          >
            {{ product.title }}
          </h3>
        </router-link>
        <p class="text-slate-400 text-xs line-clamp-2 mb-3 leading-relaxed">
          {{ product.description || "No description provided." }}
        </p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-400 text-xs">Price</span>
          <span class="text-lg font-bold text-blue-600"
            >${{ formattedPrice }}</span
          >
        </div>

        <div class="grid grid-cols-2 gap-2">
          <router-link
            :to="`/edit/${product.id}`"
            class="flex items-center justify-center gap-1 py-1.5 px-2 border border-blue-200 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </router-link>

          <button
            @click="onDelete"
            class="flex items-center justify-center gap-1 py-1.5 px-2 border border-red-200 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fallbackImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
    };
  },
  computed: {
    productImage() {
      return this.product.thumbnail || this.product.image || this.fallbackImage;
    },
    formattedPrice() {
      return Number(this.product.price || 0).toFixed(2);
    },
  },
  methods: {
    onDelete() {
      this.$emit("delete", this.product.id);
    },
    handleImageError(event) {
      event.target.src = this.fallbackImage;
    },
  },
};
</script>
