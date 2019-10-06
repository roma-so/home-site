export default {
  namespaced: true,
  state() {
    return {
      popup: false,
      auth: null,
      info: {},
    };
  },
  getters: {
    popup: stateFreezed => stateFreezed.popup,
    auth: stateFreezed => stateFreezed.auth,
    info: stateFreezed => stateFreezed.info,
  },
  actions: {
    async AUTH({ commit }) {
      const response = await this.$axios.$post('/accounts/api/profile/');
      commit('SET_AUTH', response);
    },
    async GET_USER({ commit }, id) {
      const response = await this.$axios.$get(`/api/v1/profiles/${id}`)
        .catch((error) => {
          commit('SET_AUTH', error);
        });
      commit('SET_USER', response);
    },
  },
  mutations: {
    SET_AUTH(state, response) {
      state.auth = response;
    },
    SET_POPUP_AUTH(state, status) {
      state.popup = status;
    },
    SET_USER(state, data) {
      state.info = data;
    },
  },
};
