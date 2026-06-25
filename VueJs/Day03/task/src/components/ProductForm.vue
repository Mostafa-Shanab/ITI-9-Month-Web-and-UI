<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto"
  >
    <h2 class="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">
      {{ isEditMode ? "Edit Product" : "Add New Product" }}
    </h2>

    <div>
      <label for="title" class="block text-sm font-semibold text-slate-700 mb-1"
        >Title *</label
      >
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="Product name"
        class="w-full px-4 py-2.5 rounded-lg border outline-none transition-all"
        :class="
          errors.title
            ? 'border-red-300 focus:border-red-500'
            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
        "
      />
      <p v-if="errors.title" class="mt-1 text-xs text-red-500">
        {{ errors.title }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          for="category"
          class="block text-sm font-semibold text-slate-700 mb-1"
          >Category *</label
        >
        <select
          id="category"
          v-model="form.category"
          class="w-full px-4 py-2.5 rounded-lg border outline-none bg-white transition-all"
          :class="
            errors.category
              ? 'border-red-300 focus:border-red-500'
              : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          "
        >
          <option value="" disabled>Select a category</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
          <option value="electronics">Electronics</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="other">Other</option>
        </select>
        <p v-if="errors.category" class="mt-1 text-xs text-red-500">
          {{ errors.category }}
        </p>
      </div>

      <div>
        <label
          for="price"
          class="block text-sm font-semibold text-slate-700 mb-1"
          >Price ($) *</label
        >
        <input
          id="price"
          v-model.number="form.price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          class="w-full px-4 py-2.5 rounded-lg border outline-none transition-all"
          :class="
            errors.price
              ? 'border-red-300 focus:border-red-500'
              : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          "
        />
        <p v-if="errors.price" class="mt-1 text-xs text-red-500">
          {{ errors.price }}
        </p>
      </div>
    </div>

    <div>
      <label for="image" class="block text-sm font-semibold text-slate-700 mb-1"
        >Image URL</label
      >
      <input
        id="image"
        v-model="form.thumbnail"
        type="text"
        placeholder="https://... (optional)"
        class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
      />
    </div>

    <div>
      <label
        for="description"
        class="block text-sm font-semibold text-slate-700 mb-1"
        >Description</label
      >
      <textarea
        id="description"
        v-model="form.description"
        rows="4"
        placeholder="Describe the product..."
        class="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
      ></textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-100">
      <button
        type="button"
        @click="handleCancel"
        class="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
      >
        {{ isEditMode ? "Save Changes" : "Create Product" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProductForm",
  emits: ["submit"],
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        title: "",
        price: "",
        description: "",
        category: "",
        thumbnail: "",
      },
      errors: {},
    };
  },
  computed: {
    isEditMode() {
      return !!this.product;
    },
  },
  watch: {
    product: {
      handler(newVal) {
        if (newVal) {
          this.form = {
            title: newVal.title || "",
            price: newVal.price || "",
            description: newVal.description || "",
            category: newVal.category || "",
            thumbnail: newVal.thumbnail || newVal.image || "",
          };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    resetForm() {
      this.form = {
        title: "",
        price: "",
        description: "",
        category: "",
        thumbnail: "",
      };
      this.errors = {};
    },
    validate() {
      const errors = {};
      if (!this.form.title || !this.form.title.trim()) {
        errors.title = "Title is required";
      }
      if (!this.form.category) {
        errors.category = "Category is required";
      }
      if (this.form.price === "" || this.form.price === null) {
        errors.price = "Price is required";
      } else if (Number(this.form.price) <= 0) {
        errors.price = "Price must be greater than 0";
      }
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    handleSubmit() {
      if (this.validate()) {
        this.$emit("submit", { ...this.form });
      }
    },
    handleCancel() {
      this.$router.push("/products");
    },
  },
};
</script>
