export default {
  namespaced: true,
  state: {
    favoritos: [],
  },
  mutations: {
    ADD_FAVOURITE(state, product) {
      state.favourites.push(product);
    },
    REMOVE_FAVOURITE(state, productId) {
      state.favourites = state.favourites.filter((product) => product._id !== productId);
    },
  },
};
