<template>
  <button v-if="!$store.getters.isLogged" v-on:click="login" class="authButton">Login</button>
  <button v-else v-on:click="logout" class="authButton">Logout</button>
</template>

<script>
export default {
  name: "LoginButton",
  mounted() {
    window.tokens.receiveToken((tokens) => {
      this.$store.dispatch("setTokens", tokens)
      this.$store.dispatch("refreshTokens")
    });
  },
  methods: {
    login() {
      let searchParams = new URLSearchParams({
        client_id: 8137,
        redirect_uri: "osuthumbnail://auth",
        response_type: "code",
        scope: "identify public",
      });

      window.location.href = `https://osu.ppy.sh/oauth/authorize?${searchParams.toString()}`;
    },
    logout() {
      this.$store.dispatch("clearTokens")
    }
  },
};
</script>

<style>
.authButton {
  background-color: var(--red-button);
  color: white;

  border: none;
  border-radius: 5px;
  padding: 15px 10px 15px 10px;
  margin: 5px;

  box-sizing: border-box;
  flex-basis: 10%;
}
</style>
