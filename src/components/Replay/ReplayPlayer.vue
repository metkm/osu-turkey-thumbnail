<template>
  <div id="playerRow">
    <img id="avatar" :src="player.avatar_url" />
    <p id="username">
      {{ player.username }}
    </p>
    <div id="mods"></div>
  </div>
</template>

<script>
export default {
  name: "ReplayPlayer",
  props: {
    player: {
      type: Object
    }
  }
}
</script>

<style>
#playerRow {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 85%;
  height: 28%;
}
#avatar {
  width: 100px;
  height: 100px;
  background-color: black;
  border-radius: 5px;

  background-image: url("https://a.ppy.sh/10440852");
  background-size: cover;
}
#username {
  font-size: 60px;
  flex-grow: 1;
}
#mods {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 4;
}
</style>