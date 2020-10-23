<template>
  <div>
    <div class="container">
      <StartPage />
    </div>
    <Background :gameBackground="gameBackground" />
  </div>
</template>

<script>
import Background from "../components/Background.vue";
export default {
  head() {
    return {
      title: "MCC - Achievement Tracker",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Track and get guides for all 700 achievements in Halo: The Master Chief Collection",
        },
      ],
    };
  },

  data() {
    return {
      gameBackground: "/game_backgrounds/crossgame_background.mp4",
    };
  },
};
</script>

<style>
body {
  background-color: black;
}
</style>

