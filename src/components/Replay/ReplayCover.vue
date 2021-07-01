<template>
  <div id="cover">
    <p id="titleShadow" v-if="titleShadow">{{ beatmap.beatmapset.title }}</p>
    <p id="title">{{ beatmap.beatmapset.title }}</p>
    <div class="dark_overlay"></div>
    <img id="cover_img" :src="beatmap.beatmapset.covers.cover" />
  </div>
</template>

<script>
export default {
  name: "ReplayCover",
  props: {
    titleShadow: {
      type: Boolean,
      default: false,
    },
    replay: {
      type: Boolean,
      default: true
    },
    beatmap: {
      type: Object,
      default: function() {
        return {
          beatmapset: {
            title: "Title Here",
            covers: {
              cover: `https://assets.ppy.sh/beatmaps/1491367/covers/cover@2x.jpg`
            }
          },
        };
      },
    },
  },
};
</script>

<style>
#cover {
  background-color: white;
  color: white;
  border-radius: 16px;
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;

  width: 93.5%;
  height: 50%;

  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
#cover img {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
#title {
  position: absolute;

  font-size: 60pt;
  z-index: 2;
}
#titleShadow {
  -webkit-text-stroke: white;
  -webkit-text-stroke-width: 4px;
  font-size: 80pt;
  opacity: 0.2;
  color: rgba(0, 0, 0, 0);

  position: absolute;
  z-index: 2;
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
</style>
