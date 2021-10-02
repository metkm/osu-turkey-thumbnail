<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const isLogged = computed(() => store.state.isLogged);
const login = () => {
  let searchParams = new URLSearchParams({
    client_id: "8137",
    redirect_uri: "osuthumbnail://auth",
    response_type: "code",
    scope: "identify public",
  })

  window.location.href = 
  `https://osu.ppy.sh/oauth/authorize?${searchParams.toString()}`;
}
const logout = () => {
  store.dispatch("logout")
}

window.irc.code((code) => {
  store.dispatch("login", code)
})

if (store.state.isLogged) {
  store.dispatch("refreshTokens");
}

router.push("/")
</script>

<template>
  <div class="flex gap-2">
    <router-link class="link" to="/">Replay</router-link>
    <button class="button" v-if="!isLogged" @click="login">Login</button>
    <button class="button" v-else @click="logout">Logout</button>
  </div>
  <router-view v-slot="{ Component }" >
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
