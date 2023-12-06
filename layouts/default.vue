<template>
  <div>
    <Nuxt @backgroundChanged="changeBackground" />
  </div>
</template>

<script>
import Background from "../components/Background/Background.vue";

export default {
  components: {
    Background,
  },

  methods: {
    changeBackground(selectedGame) {
      console.log("game selected 2: " + selectedGame);
    },
  },

  data() {
    return {
      gameBackground: "/game_backgrounds/crossgame_background.mp4",
    };
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background: rgb(3, 14, 19);
  background: linear-gradient(
    185deg,
    rgba(3, 14, 19, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
#background_default {
  position: relative;
}
</style>
