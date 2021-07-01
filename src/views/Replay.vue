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
          <label for="twitch">Twitch?</label>
        </div>
      </div>
    </div>
    <div class="container">
      <div id="thumbnail">
        <ReplayMetadata :enable="checked" :score="score"  />
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
    ReplayPlayer
  },
  data() {
    return {
      beatmap: undefined,
      checked: false,
      score: {
        acc: 0,
        pp: 0,
        combo: 0
      },

      player: {
        avatar_url: "https://a.ppy.sh/10440852"
      },
    };
  },
  methods: {
    drawMetadata(score) {
      var accuracyVal = score.accuracy * 100;

      this.score.acc = accuracyVal.toFixed(2);
      this.score.pp = parseInt(score.pp);
      this.score.combo = score.max_combo
    },
    drawMods(mods) {
      var modsDiv = document.getElementById("mods");
      modsDiv.innerHTML = "";

      mods.forEach((mod) => {
        var modImg = new Image();
        modImg.className = "mod";
        modImg.style.height = "120px";
        modImg.src = `Modicons/${mod}.png`;

        modsDiv.appendChild(modImg);
      });
    },
    getReplayInfo(beatmapId, userId) {
      return axios
        .get(`beatmaps/${beatmapId}/scores/users/${userId}`)
        .then((response) => response.data)
        .catch(() => this.$store.dispatch("refreshTokens"))
    },
    getUser(username) {
      return axios
        .get(`/users/${username}/osu`)
        .then((response) => response.data)
        .catch(() => this.$store.dispatch("refreshTokens"))
    },
    drawThumbnail(beatmap, replay) {
      this.getUser(replay.playerName).then((player) => {
        this.getReplayInfo(beatmap.beatmap_id, player.id).then((replayInfo) => {
          this.drawMetadata(replayInfo.score);
          this.drawMods(replayInfo.score.mods);

          // desc txt file
          window.fs.writeDesc(beatmap, replayInfo, player);

          // map cover
          this.beatmap = {
            ...beatmap,
            beatmapset: {
              title: beatmap.title,
              covers: {
                cover: `https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover.jpg`
              }
            }
          }

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
      window.replay.sendReplayRequest();
      window.replay.receiveReplayRequest((replay) => {
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
