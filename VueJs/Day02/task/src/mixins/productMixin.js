import axios from "axios";

export default {
  data() {
    return {
      product: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async getProductById(id) {
      this.loading = true;
      this.error = null;
      this.product = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`,
        );
        this.product = response.data;
      } catch (err) {
        this.error = "Product not found.";
      } finally {
        this.loading = false;
      }
    },
  },
};
