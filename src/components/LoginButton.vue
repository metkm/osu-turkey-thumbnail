<template>
  <button v-on:click="login" class="login">Login</button>
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
  },
};
</script>

<style>
.login {
  background-color: #ff3a3b;
}
</style>
