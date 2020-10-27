<template>
  <div>
    <div id="mainpage_div">
      <div class="header" @click="goHome">
        <Logo id="mainpage_logo" />
        <h6 class="tracker_title">MCC Achievement Tracker</h6>
      </div>
      <MainPage @backgroundChanged="changeBackground" />
    </div>
    <Background id="background_default" :gameBackground="gameBackground" />
  </div>
</template>

<script>
import Background from "../../../../components/Background.vue";
export default {
  middleware: "redirect_check",
  head() {
    return {
      title: `${this.$route.params.user}'s Achievements`,
      meta: [
        {
          hid: "description",
          name: "Main",
          content:
            "Track and get guides for all 700 achievements in Halo: The Master Chief Collection",
        },
      ],
    };
  },

  data() {
    return {
      gameBackground: "/game_backgrounds/reach_background.mp4",
    };
  },

  methods: {
    changeBackground(selectedGame) {
      this.gameBackground = `/game_backgrounds/${selectedGame}_background.mp4`;
    },

    goHome() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
.header {
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 220px;
  margin: 0 auto;
}
#mainpage_logo {
  width: 30%;
  padding-top: 5%;
}
#mainpage_div {
  position: absolute;
  padding-right: 15%;
  padding-left: 15%;
  z-index: 1;
  width: 100%;
}

.tracker_title{
  font-size:0.7vw;
}
h6 {
  color: white;
}
</style>