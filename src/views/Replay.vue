<template>
  <div class="replay" v-if="$store.getters.isLogged">
    <div class="path">
      <button v-on:click="prepareThumbnail">Select Replay File</button>
      <div class="settings">
        <input class="checkbox" type="checkbox" name="twitch" v-model="checked">
        <label for="twitch">Twitch?</label>
      </div>
    </div>

    <div id="thumbnail_container" class="container">
      <div id="thumbnail" v-on:click="downloadCanvas">
        <div id="metadata">
          <img id="twitch" src="../assets/TwitchLogo.svg" v-if="checked">
          <div id="stats">
            <div class="stat_container acc_container">
              <div class="acc_text text">
                Acc
              </div>
              <p id="acc_value" class="value">
                99.55
              </p>
            </div>
            <div class="stat_container">
              <div class="combo_text text">
                Combo
              </div>
              <div id="combo_value" class="value">
                2740
              </div>
            </div>
            <div class="stat_container">
              <div class="pp_text text">
                PP
              </div>
              <div id="pp_value" class="value">
                1200
              </div>
            </div>
          </div>
        </div>
        <div id="cover">
          <p id="title"></p>
          <div class="dark_overlay"></div>
          <img id="cover_img" src="https://assets.ppy.sh/beatmaps/788233/covers/cover@2x.jpg">
        </div>
        <div id="player">
          <img id="avatar" src="https://a.ppy.sh/10440852">
          <p id="username">
            Sibyl
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Replay",
  data() {
    return {
      checked: false
    }
  },
  methods: {
    downloadCanvas() {
      window.htmlToCanvas.downloadCanvas();
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
      var acc = document.getElementById("acc_value");
      var combo = document.getElementById("combo_value");
      var pp = document.getElementById("pp_value");

      var accuracy = score.accuracy * 100;
      accuracy = accuracy.toFixed(2);

      var ppFixed = parseInt(score.pp);
      // ppFixed = Math.round(pp);

      acc.innerText = accuracy;
      combo.innerText = score.max_combo;
      pp.innerText = ppFixed;
    },
    getReplayInfo(beatmapId, userId) {
      return axios.get(`beatmaps/${beatmapId}/scores/users/${userId}`)
      .then(response => response.data)
    },
    getUser(username) {
      return axios.get(`/users/${username}/osu`)
      .then(response => response.data)
    },
    drawThumbnail(beatmap, replay) {
      this.getUser(replay.playerName).then(player => {
        this.getReplayInfo(beatmap.beatmap_id, player.id).then(replayInfo => {
          this.drawMetadata(replayInfo.score)

          // map cover
          var coverLink = `https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover@2x.jpg`;
          var mapCover = document.getElementById("cover_img");
          mapCover.src = coverLink;

          // player
          document.getElementById("avatar").src = player.avatar_url;
          document.getElementById("username").innerText = player.username;
        })
      })
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
        this.getBeatmap(replay.beatmapMD5).then((beatmap) =>
          this.drawThumbnail(beatmap, replay)
        );
      });
    },
  },
};
</script>

<style scoped>
#reference {
  position: absolute;
  left: 0;
  top: 0;

  object-fit: cover;
  height: 100%;
  opacity: 0.2;
}
#thumbnail {
  position: relative;
}

button {
  padding: 15px 10px 15px 10px;
  margin: 5px;

  color: white;

  border: none;
  border-radius: 5px;
  background-color: #ff3a3b;
  box-sizing: border-box;
  flex-grow: 1;
}
.replay {
  display: flex;
  flex-direction: column;
  padding: 10px;

  flex-grow: 1;
  font-family: Century Gothic;
}
.path {
  display: flex;
  flex-direction: column;
}
.container {
  flex-grow: 1;
  padding: 5px;
}
.settings {
  display: flex;
}
.checkbox {
  padding: 10px;
}
#thumbnail {
  background-color: white;
  width: 1366px;
  height: 768px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#cover {
  background-color: white;
  border-radius: 16px;

  width: 93.5%;
  height: 50%;

  position: relative;
  overflow: hidden;
}
#cover img {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
.dark_overlay {
  position: absolute;
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
}
#metadata {
  display: flex;
  align-items: flex-end;
  width: 86%;
  height: 28%;
}
#twitch {
  width: 95px;
  height: 95px;
  margin-bottom: 4px;
  border-radius: 8px;

  position: absolute;
}
#stats {
  display: flex;
  flex-grow: 1;

  justify-content: flex-end;
}
.stat_container {
  margin-bottom: -14px;
  text-align: left;

  flex: 0 0 20%;
}
.stat_container p {
  margin-top: 0px;
  margin-bottom: 0px;
}
.acc_container {
  margin-right: 40px;
}
.value {
  font-size: 76px;
}
.text {
  font-size: 28px;
  margin-bottom: -10px;
  margin-left: 10px;
}

#player {
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
  margin-left: 15px;
}
</style>
