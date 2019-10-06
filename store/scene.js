export default {
  namespaced: true,
  state() {
    return {
      textColor: '#000000',
      textSize: 240,
    };
  },
  getters: {
    textSmall: stateFreezed => stateFreezed.textSmall,
    textColor: stateFreezed => stateFreezed.textColor,
  },
  actions: {
  },
  mutations: {
    SET_TEXT_COLOR(state, status) {
      state.textColor = status
    },
    SET_TEXT_SIZE(state, status) {
      state.textSize = status
    }
  }
};
