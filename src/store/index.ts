import createPersistedState from "vuex-persistedstate";
import { createStore } from "vuex";
import { tokens } from "../types";
import axios from "axios";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    isLogged: false,
    accessToken: "",
    refreshToken: "",
  },
  mutations: {
    SET_TOKENS(state, tokens: tokens) {
      state.accessToken = tokens.access_token;
      state.refreshToken = tokens.refresh_token;
      state.isLogged = true;

      // @ts-ignore
      axios.defaults.headers!.common["Authorization"] = `Bearer ${state.accessToken}`;
    },
    DEL_TOKENS(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLogged = false;
    }
  },
  actions: {
    async login({ commit }, code: string) {
      const response = await axios.post("https://osu.ppy.sh/oauth/token", {
        client_id: 8137,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "osuthumbnail://auth"
      });

      commit("SET_TOKENS", response.data);
    },
    async logout({ commit }) {
      commit("DEL_TOKENS")
    },
    async refreshTokens({ commit, state }) {
      // @ts-ignore
      axios.defaults.headers!.common["Authorization"] = `Bearer ${state.accessToken}`;

      try {
        await axios.get("https://osu.ppy.sh/api/v2/me");
      } catch {
        const response = await axios.post("https://osu.ppy.sh/oauth/token", {
          client_id: 8137,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: state.refreshToken
        });

        commit("SET_TOKENS", response.data);
      }
    }
  }
})
