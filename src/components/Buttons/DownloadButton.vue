<template>
  <RedButton @click="downloadThumbnail">
    Download Thumbnail
  </RedButton>
</template>

<script>
import RedButton from "./RedButton.vue";
import { toPng } from "html-to-image";

export default {
  name: "DownloadButton",
  components: {
    RedButton
  },
  methods: {
    downloadThumbnail() {
      var thumbnailElement = document.getElementById("thumbnail");
      toPng(thumbnailElement).then((dataUrl) => {
        window.fs.downFromDataUrl(dataUrl);
      });
    },
  }
}
</script>

<style>

</style>