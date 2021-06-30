<template>
  <div id="NavPageButtons">
    <button v-on:click="prepareThumbnail">Select Replay File</button>
  
    <button id="download" @click="downloadThumbnail">
      Download Thumbnail
    </button>
  </div>
</template>

<script>
export default {
  name: "NavPageButtons",
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