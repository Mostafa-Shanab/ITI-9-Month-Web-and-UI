import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    selectedProduct: null,
    listLoading: false,
    listError: null,
    itemLoading: false,
    itemError: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setListLoading(state, val) {
      state.listLoading = val;
    },
    setListError(state, val) {
      state.listError = val;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    setItemLoading(state, val) {
      state.itemLoading = val;
    },
    setItemError(state, val) {
      state.itemError = val;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    removeProduct(state, id) {
      state.products = state.products.filter((p) => p.id !== id);
    },
    updateProductInList(state, updated) {
      state.products = state.products.map((p) =>
        p.id === updated.id ? updated : p,
      );
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("setListLoading", true);
      commit("setListError", null);
      try {
        const res = await axios.get("http://localhost:3000/products");
        commit("setProducts", res.data);
      } catch (e) {
        commit(
          "setListError",
          "Could not connect to local server. Make sure you ran: npm run server",
        );
      } finally {
        commit("setListLoading", false);
      }
    },
    async fetchProductById({ commit }, id) {
      commit("setItemLoading", true);
      commit("setItemError", null);
      commit("setSelectedProduct", null);
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        commit("setSelectedProduct", res.data);
      } catch (e) {
        commit("setItemError", "Product not found.");
      } finally {
        commit("setItemLoading", false);
      }
    },
    async deleteProduct({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        commit("removeProduct", id);
      } catch (e) {
        console.log(e);
      }
    },
    async createProduct({ commit }, payload) {
      const res = await axios.post("http://localhost:3000/products", payload);
      commit("addProduct", res.data);
      return res.data;
    },
    async updateProduct({ commit }, { id, payload }) {
      const res = await axios.patch(
        `http://localhost:3000/products/${id}`,
        payload,
      );
      commit("updateProductInList", res.data);
      return res.data;
    },
  },
  getters: {
    products: (state) => state.products,
    selectedProduct: (state) => state.selectedProduct,
    listLoading: (state) => state.listLoading,
    listError: (state) => state.listError,
    itemLoading: (state) => state.itemLoading,
    itemError: (state) => state.itemError,
  },
});
