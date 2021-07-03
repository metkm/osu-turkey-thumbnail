<template>
  <div id="metadata">
    <img id="gamemode" :src="require(`@/assets/Gamemodeicons/${gamemode}.png`)">
    <img id="twitch" src="../../assets/TwitchLogo.svg" v-if="enable" />
    <div id="stats">
      <div class="stat_container acc_container">
        <div class="acc_text text">
          Acc
        </div>
        <div id="acc_value" class="value">
          {{ score.acc }}
        </div>
      </div>
      <div class="stat_container">
        <div class="combo_text text">
          Combo
        </div>
        <div id="combo_value" class="value">
          {{ score.combo }}
        </div>
      </div>
      <div class="stat_container">
        <div class="pp_text text">
          PP
        </div>
        <div id="pp_value" class="value">
          {{ score.pp }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplayMetadata",
  props: {
    gamemode: Number,
    enable: Boolean,
    score: {
      acc: {
        type: Number,
      },
      combo: {
        type: Number,
      },
      pp: {
        type: Number,
      }
    }
  }
}
</script>

<style>
.acc_container {
  margin-right: 40px;
}
#twitch {
  width: 95px;
  height: 95px;
  margin-bottom: 4px;

  position: absolute;
}
.stat_container {
  margin-bottom: -14px;
  text-align: left;

  flex: 0 0 18%;
}
.stat_container p {
  margin-top: 0px;
  margin-bottom: 0px;
}
#stats {
  display: flex;
  flex-grow: 1;
  margin-right: -50px;

  justify-content: flex-end;
}
.text {
  font-size: 28px;
  margin-bottom: -10px;
  margin-left: 10px;
}
.value {
  font-size: 76px;
}
#metadata {
  display: flex;
  align-items: flex-end;
  width: 86%;
  height: 28%;
}

#gamemode {
  position: absolute;
  width: 180px;
  height: 180px;

  top: 0px;
  left: 0px;

  margin-left: -60px;
  margin-top: -60px;
}
</style>