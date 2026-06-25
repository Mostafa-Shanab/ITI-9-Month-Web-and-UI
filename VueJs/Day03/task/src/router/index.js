import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import AddProduct from "../views/AddProduct.vue";
import EditProduct from "../views/EditProduct.vue";
import ProductDetails from "../views/ProductDetails.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "products",
        name: "Products",
        component: Products,
      },
      {
        path: "add",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "edit/:id",
        name: "EditProduct",
        component: EditProduct,
      },
      {
        path: "product/:id",
        name: "ProductDetails",
        component: ProductDetails,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || "/"),
  routes,
});

export default router;
