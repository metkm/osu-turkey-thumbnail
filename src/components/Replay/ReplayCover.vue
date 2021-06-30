<template>
  <div id="cover">
    <p id="title">Title Here!</p>
    <div class="dark_overlay"></div>
    <img
      id="cover_img"
      src="https://assets.ppy.sh/beatmaps/788233/covers/cover@2x.jpg"
    />
  </div>
</template>

<script>
export default {
  name: "ReplayCover"
}
</script>

<style>
#cover {
  background-color: white;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

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
#title {
  position: absolute;

  font-size: 60pt;
  z-index: 2;
  color: white;
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