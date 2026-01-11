<template>
  <div class="page-wrapper">
    <Background :gameBackground="gameBackground" />
    <div class="content-wrapper">
      <HomePage />
    </div>
  </div>
</template>

<script>
import Background from "../components/Background/Background.vue";
export default {
  components: {
    Background
  },
  head() {
    return {
      title: "MCC - Achievement Tracker",
      script: [
        {
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1575411387449407',
          crossorigin: 'anonymous'
        }
      ],
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
  margin: 0;
  padding: 0;
}

.page-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  overflow-y: auto;
}
</style>
