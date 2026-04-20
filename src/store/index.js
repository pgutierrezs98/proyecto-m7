import { createStore } from "vuex";
import products from "./modules/products";
import filtros from "./modules/filtros";
import favoritos from "./modules/favoritos";

export default createStore({
  modules: {
    products,
    filtros,
    favoritos,
  },
});
