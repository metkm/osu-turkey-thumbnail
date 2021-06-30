<template>
  <div class="replay" v-if="$store.getters.isLogged">
    <div class="pageNav">
      <div class="pageButtons">
        
        <RedButton @click="prepareThumbnail">
          Select Replay File
        </RedButton>

        <RedButton @click="downloadThumbnail" >
          Download Thumbnail
        </RedButton>
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
    <div id="thumbnail_container" class="container">
      <div id="thumbnail">
        <ReplayMetadata :enable="checked" :score="score"  />
        <ReplayCover />
        <ReplayPlayer :player="player" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { toPng } from "html-to-image";

import ReplayCover from "../components/Replay/ReplayCover.vue";
import ReplayMetadata from "../components/Replay/ReplayMetadata.vue";
import ReplayPlayer from "../components/Replay/ReplayPlayer.vue";

import RedButton from "../components/Buttons/RedButton.vue";

export default {
  name: "Replay",
  components: {
    ReplayCover,
    ReplayMetadata,
    ReplayPlayer,
    RedButton
  },
  data() {
    return {
      checked: false,
      score: {
        acc: 0,
        pp: 0,
        combo: 0
      },

      player: {
        avatar_url: "https://a.ppy.sh/10440852"
      }
    };
  },
  methods: {
    downloadThumbnail() {
      var thumbnailElement = document.getElementById("thumbnail");
      toPng(thumbnailElement).then((dataUrl) => {
        window.fs.downFromDataUrl(dataUrl);
      });
    },
    getBackground() {
      var image = new Image();

      image.style.position = "absolute";
      image.style.top = "0px";
      image.style.left = "0px";
      image.style.width = "100%";
      image.style.height = "100%";
      image.style.objectFit = "cover";
      image.crossOrigin = "Anonymous";

      image.src = "https://assets.ppy.sh/beatmaps/770300/covers/cover@2x.jpg";

      return image;
    },
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
          var coverLink = `https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover@2x.jpg`;
          var mapCover = document.getElementById("cover_img");
          mapCover.src = coverLink;

          // map title
          var title = document.getElementById("title");
          title.innerText = beatmap.title;

          // player
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
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: 5px;
  overflow: hidden;
}
.settings {
  display: flex;

  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
}
.checkbox {
  padding: 10px;
}
.settings {
  margin: 5px;
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
#mods {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  max-height: 100%;
  width: 100%;
}
.mod {
  height: 120px;
}
</style>
