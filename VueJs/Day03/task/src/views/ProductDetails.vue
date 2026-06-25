<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div>
      <router-link
        to="/products"
        class="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
      >
        &larr; Back to Products
      </router-link>
      <h1 class="text-3xl font-extrabold text-slate-800">Product Details</h1>
    </div>

    <div
      v-if="error"
      class="p-8 text-center bg-red-50 border border-red-100 rounded-2xl text-red-600"
    >
      <h3 class="font-bold mb-1">Could Not Load Product</h3>
      <p class="text-sm">{{ error }}</p>
      <router-link
        to="/products"
        class="mt-4 inline-block px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg"
      >
        Go Back
      </router-link>
    </div>

    <Loader v-if="loading" text="Loading product details..." />

    <div
      v-else-if="product"
      class="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8"
    >
      <div
        class="bg-slate-50 rounded-xl flex items-center justify-center p-6 border border-slate-100 min-h-64"
      >
        <img
          :src="productImage"
          :alt="product.title"
          class="max-h-64 max-w-full object-contain"
          @error="handleImageError"
        />
      </div>

      <div class="flex flex-col justify-between gap-6">
        <div class="space-y-4">
          <span
            class="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100"
          >
            {{ product.category || "General" }}
          </span>

          <h2 class="text-2xl font-extrabold text-slate-800">
            {{ product.title }}
          </h2>

          <p class="text-2xl font-black text-blue-600">${{ formattedPrice }}</p>

          <div>
            <p
              class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1"
            >
              Description
            </p>
            <p class="text-slate-600 text-sm leading-relaxed">
              {{ product.description || "No description available." }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <router-link
            :to="`/edit/${product.id}`"
            class="flex items-center justify-center gap-1.5 py-2.5 px-4 border border-blue-200 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <svg
              class="w-4 h-4"
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
            @click="deleteItem"
            class="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-red-50 border border-red-100 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            <svg
              class="w-4 h-4"
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Loader from "../components/Loader.vue";

export default {
  name: "ProductDetails",
  components: { Loader },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const fallbackImage =
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80";

    onMounted(() => {
      store.dispatch("fetchProductById", route.params.id);
    });

    const product = computed(() => store.state.selectedProduct);
    const loading = computed(() => store.state.itemLoading);
    const error = computed(() => store.state.itemError);

    const productImage = computed(() =>
      product.value
        ? product.value.thumbnail || product.value.image || fallbackImage
        : fallbackImage,
    );

    const formattedPrice = computed(() =>
      Number(product.value?.price || 0).toFixed(2),
    );

    function handleImageError(event) {
      event.target.src = fallbackImage;
    }

    async function deleteItem() {
      if (confirm("Delete this product?")) {
        try {
          await store.dispatch("deleteProduct", product.value.id);
          router.push("/products");
        } catch (err) {
          alert("Failed to delete product.");
        }
      }
    }

    return {
      product,
      loading,
      error,
      productImage,
      formattedPrice,
      handleImageError,
      deleteItem,
    };
  },
};
</script>
