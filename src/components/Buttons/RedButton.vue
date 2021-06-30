<template>
  <button id="redButton">
    <div id="text">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  name: "RedButton"
}
</script>

<style scoped>
button {
  background-color: var(--red-button);
  border-radius: 5px;
  border: none;
  color: white;
  font-family: 'Roboto', sans-serif;

  padding: 15px;
  margin: 5px;

  box-sizing: border-box;
  flex-grow: 1;

  transition-duration: 300ms;
}
div {
  transition-duration: 300ms;
}
button:hover > div {
  transform: translateX(-10%);
}
</style>