export default {
  namespaced: true,
  state: {
    favourites: [],
  },
  mutations: {
    ADD_FAVOURITE(state, product) {
      state.favourites.push(product);
    },
    REMOVE_FAVOURITE(state, productId) {
      state.favourites = state.favourites.filter((product) => product._id !== productId);
    },
  },

  actions: {
    toggleFavourite({ commit, state }, product) {
      const alreadyFavourite = state.favourites.some((prod) => prod._id === product._id);
      if (alreadyFavourite) {
        commit('REMOVE_FAVOURITE', product._id);
      } else {
        commit('ADD_FAVOURITE', product);
      }
    },
  },

  getters: {
    totalFavourites(state) {
      return state.favourites.length;
    },

    isFavourite: (state) => (productId) => {
      return state.favourites.some((prod) => prod._id === productId);
    },
  },
};
