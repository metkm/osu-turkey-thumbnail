<template>
  <div class="knockout container" v-if="$store.getters.isLogged">
    <div class="pageNav">
      <div class="pageButtons">
        <div class="beatmapId">
          <input type="text" v-model="beatmapId" placeholder="beatmap Id">
        </div>

        <DownloadButton />
      </div>
      <div class="settings">
        
      </div>
    </div>
    <div class="container">
      <div id="thumbnail">
        <ReplayCover :titleShadow=true :beatmap="beatmap" />
        <div id="bottom"> 
          <p id="artist"> {{ beatmap?.beatmapset.artist ? beatmap.beatmapset.artist : "Artist Here!" }} - {{ beatmap?.version ? beatmap.version : "Diff Here!" }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReplayCover from "../components/Replay/ReplayCover.vue";
import DownloadButton from "../components/Buttons/DownloadButton.vue";

import axios from "axios";

export default {
  name: "Knockout",
  data() {
    return {
      beatmapId: 0,
      currentTimeout: null,
      beatmap: undefined
    }
  },
  components: {
    ReplayCover,
    DownloadButton
  },
  methods: {
    writeDesc(beatmap) {
      var beatmapset = beatmap.beatmapset

      var text = `[Knockout] ${beatmapset.title} [${beatmap.version}]`

      window.fs.writeDesc(text);
    },
    getBeatmapFromId(beatmapId) {
      axios.get(`/beatmaps/${beatmapId}`)
      .then(response => {
        this.beatmap = response.data;

        this.writeDesc(response.data)
      })
    }
  },
  watch: {
    beatmapId(val) {
      let isnum = /^\d+$/.test(val);
      if (!isnum) {
        return
      }

      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout)
      }

      this.currentTimeout = setTimeout(() => {
        this.getBeatmapFromId(val);
      }, 1000);
    }
  }
}
</script>

<style scoped>
.knockout {
  padding: 10px;

  font-family: Century Gothic;
  display: flex;
  flex-direction: column;
}
.pageButtons {
  display: flex;
  width: 50%;
}
.pageNav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.settings {
  display: flex;
  justify-content: center;
}
.beatmapId {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.knockout input {
  margin: 5px;
  border: 2px solid var(--red-button);
  height: 100%;

  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  text-align: center;
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
  justify-content: flex-start;
}
#cover {
  height: 80%;
  width: 96%;
  margin-top: 20px;
  flex-grow: 1;
}
#bottom {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
#bottom p {
  margin: 0px;
  font-size: 4rem;
}
</style>