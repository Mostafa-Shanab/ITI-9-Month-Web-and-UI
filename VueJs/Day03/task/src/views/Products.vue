<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800">Products</h1>
        <p class="text-slate-500 text-sm">
          All products from your local database.
        </p>
      </div>
      <router-link
        to="/add"
        class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
      >
        Add Product
      </router-link>
    </div>

    <Loader v-if="loading" text="Loading products..." />

    <div
      v-else-if="error"
      class="p-8 text-center bg-red-50 border border-red-100 rounded-2xl text-red-600"
    >
      <h3 class="font-bold text-lg mb-1">Error</h3>
      <p class="text-sm">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else>
      <div
        v-if="products.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="prod in products"
          :key="prod.id"
          :product="prod"
          @delete="handleDeleteProduct"
        />
      </div>

      <div
        v-else
        class="text-center py-16 bg-white rounded-2xl border border-slate-100"
      >
        <h3 class="text-lg font-bold text-slate-800 mb-1">No products found</h3>
        <p class="text-slate-500 text-sm">
          Add your first product to get started.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ProductCard from "../components/ProductCard.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Products",
  components: {
    ProductCard,
    Loader,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("fetchProducts");
    });

    const products = computed(() => store.state.products);
    const loading = computed(() => store.state.listLoading);
    const error = computed(() => store.state.listError);

    const handleDeleteProduct = async (id) => {
      if (confirm("Delete this product?")) {
        try {
          await store.dispatch("deleteProduct", id);
        } catch (err) {
          alert("Failed to delete product.");
        }
      }
    };

    return { products, loading, error, handleDeleteProduct };
  },
};
</script>
