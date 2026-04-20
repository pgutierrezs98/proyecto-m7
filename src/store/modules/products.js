import apiClient from '@/api/apiClient';

export default {
  namespaced: true,
  state: {
    products: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, newProducts) {
      state.products = newProducts;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    // context: { commit, state, getters, dispatch }
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await apiClient.get('/products');
        commit('SET_PRODUCTS', response.data.data);
      } catch (err) {
        commit('SET_ERROR', err);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },

  getters: {
    categoriasUnicas(state) {
      return [...new Set(state.products.map((product) => product.category))];
    },
  },
};
