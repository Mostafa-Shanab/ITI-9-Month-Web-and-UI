<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div>
      <router-link
        to="/products"
        class="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
      >
        &larr; Back to Products
      </router-link>
      <h1 class="text-3xl font-extrabold text-slate-800">Add Product</h1>
      <p class="text-slate-500 text-sm">
        Create a new product in the local database.
      </p>
    </div>

    <div
      v-if="error"
      class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium"
    >
      {{ error }}
    </div>

    <div class="relative">
      <div
        v-if="submitting"
        class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-2xl"
      >
        <Loader text="Saving product..." />
      </div>
      <ProductForm @submit="createProduct" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductForm from "../components/ProductForm.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "AddProduct",
  components: {
    ProductForm,
    Loader,
  },
  data() {
    return {
      submitting: false,
      error: null,
    };
  },
  methods: {
    async createProduct(formData) {
      this.submitting = true;
      this.error = null;
      try {
        await axios.post("http://localhost:3000/products", {
          title: formData.title || "No title",
          price: formData.price || 0,
          description: formData.description || "No description",
          category: formData.category || "General",
          thumbnail: formData.thumbnail || "No thumbnail",
          rating: 0,
          stock: 10,
          discountPercentage: 0,
          reviews: [],
          tags: [formData.category],
        });
        this.$router.push("/products");
      } catch (err) {
        this.error =
          "Failed to create product. Make sure the server is running: npm run server";
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
