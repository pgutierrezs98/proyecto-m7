export default {
  namespaced: true,
  state: {
    category: null,
    lowestPrice: 0,
    highestPrice: 0,
  },
  mutations: {
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_LOWEST_PRICE(state, lowest) {
      state.lowestPrice = lowest;
    },
    SET_HIGHEST_PRICE(state, highest) {
      state.highestPrice = highest;
    },
    RESET_FILTERS(state) {
      state.category = null;
      state.lowestPrice = 0;
    },
  },

  getters: {
    productosFiltrados(state, _getters, rootState) {
      //rootState para acceder al estado de otro módulo (en este caso 'products')
      return rootState.products.products.filter((product) => {
        const coincideCategory = !state.category || product.category === state.category;
        const coincidePrice = product.price >= state.lowestPrice && product.price <= state.highestPrice;

        return coincideCategory && coincidePrice;
      });
    },
  },
};
