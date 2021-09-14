<template>
  <div class="replay container" v-if="$store.getters.isLogged">
    <div class="pageNav">
      <div class="pageButtons">
        <RedButton @click="prepareThumbnail">
          Select Replay File
        </RedButton>

        <DownloadButton />
      </div>
      <div class="settings">
        <div class="setting">
          <input
            class="checkbox"
            type="checkbox"
            name="twitch"
            v-model="checked"
          />
          <label for="twitch">twitch</label>
        </div>
        <div class="setting">
          <input
            v-model="gamemode"
            type="radio"
            name="gamemode"
            id="standart"
            :value="0"
          />
          <label for="0">Standart</label>
          <!-- <input v-model="gamemode" type="radio" name="gamemode" id="taiko" :value="1"> -->
          <!-- <label for="1">taiko</label> -->
          <input
            v-model="gamemode"
            type="radio"
            name="gamemode"
            id="catch"
            :value="2"
          />
          <label for="2">catch</label>
        </div>
      </div>
    </div>
    <div class="container">
      <div id="thumbnail">
        <ReplayMetadata :enable="checked" :score="score" :gamemode="gamemode" />
        <ReplayCover :beatmap="beatmap" />
        <ReplayPlayer :player="player" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

import RedButton from "../components/Buttons/RedButton.vue";
import DownloadButton from "../components/Buttons/DownloadButton.vue";

import ReplayCover from "../components/Replay/ReplayCover.vue";
import ReplayMetadata from "../components/Replay/ReplayMetadata.vue";
import ReplayPlayer from "../components/Replay/ReplayPlayer.vue";

export default {
  name: "Replay",
  components: {
    RedButton,
    DownloadButton,
    ReplayCover,
    ReplayMetadata,
    ReplayPlayer,
  },
  data() {
    return {
      beatmap: undefined,
      gamemode: 0,
      checked: false,
      score: {
        acc: 0,
        pp: 0,
        combo: 0,
      },

      player: {
        avatar_url: "",
      },
    };
  },
  methods: {
    drawMetadata(score) {
      var accuracyVal = score.accuracy * 100;
      this.score.acc = accuracyVal.toFixed(2);
      this.score.pp = score.pp;
      this.score.combo = score.max_combo;
    },
    drawMods(mods) {
      var modsDiv = document.getElementById("mods");
      modsDiv.innerHTML = "";

      mods.forEach((mod) => {
        var modImg = new Image();
        modImg.className = "mod";
        modImg.style.height = "120px";
        modImg.src = require(`@/assets/Modicons/${mod}.png`);

        modsDiv.appendChild(modImg);
      });
    },
    getReplayInfo(beatmapId, userId) {
      return axios
        .get(`beatmaps/${beatmapId}/scores/users/${userId}`)
        .then((response) => response.data)
        .catch(() => this.$store.dispatch("refreshTokens"));
    },
    getUser(username) {
      return axios
        .get(`/users/${username}/osu`)
        .then((response) => response.data)
        .catch(() => this.$store.dispatch("refreshTokens"));
    },
    writeDesc(player, beatmap, replay) {
      var gamemodeString = "";
      if (beatmap.mode == 2) {
        gamemodeString = "[osu!catch] "
      }

      var modsString = "";
      replay.score.mods.forEach((mod) => (modsString += mod));

      if (modsString) {
        modsString += " "
      }

      // replay info acc etc.
      var accuracy = replay.score.accuracy * 100;
      accuracy = accuracy.toFixed(2);

      var pp = replay.score.pp;
      if (pp != "Loved") {
        pp += "pp";
      }

      var text = `
# Baslik
${gamemodeString}${player.username} - ${beatmap.title} [${beatmap.version}] ${accuracy}% ${modsString}${replay.score.max_combo}x ${pp}

# Aciklama
Oyuncu: https://osu.ppy.sh/users/${player.id}
Beatmap: https://osu.ppy.sh/beatmapsets/${beatmap.beatmapset_id}#osu/${beatmap.beatmap_id}
Skin: 
      `;

      window.fs.writeDesc(text);
    },
    drawThumbnail(beatmap, replay) {
      this.getUser(replay.playerName).then((player) => {
        this.getReplayInfo(beatmap.beatmap_id, player.id).then((replayInfo) => {
          if (!replayInfo.score.pp) {
            replayInfo.score.pp = "Loved";
          } else {
            replayInfo.score.pp = parseInt(replayInfo.score.pp);
          }

          this.drawMetadata(replayInfo.score);
          this.drawMods(replayInfo.score.mods);

          // desc txt file
          this.writeDesc(player, beatmap, replayInfo);

          // map cover
          this.beatmap = {
            ...beatmap,
            beatmapset: {
              title: beatmap.title,
              covers: {
                cover: `https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover.jpg`,
              },
            },
          };

          // this.beatmap = beatmap
          this.player = player;
        });
      });
    },
    getBeatmap(md5) {
      const oldAxios = axios.create({
        headers: null,
      });

      return oldAxios
        .get("/get_beatmaps", {
          baseURL: "https://osu.ppy.sh/api",
          params: {
            h: md5,
            k: "f3f4ce0764471e75aa4bd1469a995216482ee744",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => response.data[0])
        .catch((err) => {
          console.log(err.headers);
        });
    },
    prepareThumbnail() {
      window.replay.read((replay) => {
        this.getBeatmap(replay.beatmapMD5).then((beatmap) => {
          this.drawThumbnail(beatmap, replay);
        });
      });
    },
  },
};
</script>

<style scoped>
.replay {
  display: flex;
  flex-direction: column;
  padding: 10px;

  flex-grow: 1;
  font-family: Century Gothic;
}
.pageNav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pageButtons {
  display: flex;
  width: 50%;
}
.checkbox {
  padding: 10px;
}
.mod {
  height: 120px;
}
#thumbnail {
  background-color: white;
  width: 1366px;
  height: 768px;

  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
