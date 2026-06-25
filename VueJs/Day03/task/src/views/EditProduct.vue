<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <div>
      <router-link
        to="/products"
        class="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
      >
        &larr; Back to Products
      </router-link>
      <h1 class="text-3xl font-extrabold text-slate-800">Edit Product</h1>
      <p class="text-slate-500 text-sm">Update the selected product details.</p>
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

    <div
      v-if="updateError"
      class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium"
    >
      {{ updateError }}
    </div>

    <Loader v-if="loading" text="Loading product..." />

    <div v-else-if="product" class="relative">
      <div
        v-if="updating"
        class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-2xl"
      >
        <Loader text="Saving changes..." />
      </div>
      <ProductForm :product="product" @submit="updateProduct" />
    </div>
  </div>
</template>

<script>
import ProductForm from "../components/ProductForm.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "EditProduct",
  components: {
    ProductForm,
    Loader,
  },
  data() {
    return {
      updating: false,
      updateError: null,
    };
  },
  computed: {
    product() {
      return this.$store.state.selectedProduct;
    },
    loading() {
      return this.$store.state.itemLoading;
    },
    error() {
      return this.$store.state.itemError;
    },
  },
  mounted() {
    this.$store.dispatch("fetchProductById", this.$route.params.id);
  },
  methods: {
    async updateProduct(formData) {
      this.updating = true;
      this.updateError = null;
      const id = this.$route.params.id;
      try {
        await this.$store.dispatch("updateProduct", {
          id,
          payload: {
            title: formData.title,
            price: formData.price,
            description: formData.description,
            category: formData.category,
            thumbnail: formData.thumbnail,
          },
        });
        this.$router.push("/products");
      } catch (err) {
        this.updateError =
          "Failed to update product. Make sure the server is running: npm run server";
      } finally {
        this.updating = false;
      }
    },
  },
};
</script>
