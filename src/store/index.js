import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    accessToken: "",
    refreshToken: "",
    isLogged: false,
  },
  mutations: {
    SET_TOKENS(state, payload) {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.isLogged = true;

      axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
    },
    DEL_TOKENS(state) {
      state.accessToken = "",
      state.refreshToken = "",
      state.isLogged = false
    }
  },
  actions: {
    setTokens({ commit }, payload) {
      commit("SET_TOKENS", payload);
    },
    refreshTokens({ state, commit }) {
      window.tokens.sendRefreshToken(state.refreshToken)
      window.tokens.receiveNewTokens(tokens => {
        commit("SET_TOKENS", tokens)
      })
    },
    clearTokens({commit}) {
      commit("DEL_TOKENS")
    }
  },
  getters: {
    getTokens(state) {
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    },
    isLogged(state) {
      return state.isLogged;
    },
  },
});
