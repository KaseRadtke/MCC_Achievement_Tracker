<template>
  <div>
    <div id="mainpage_div">
      <div class="header" @click="goHome">
        <Logo id="mainpage_logo" />
        <h6>MCC Achievement Tracker</h6>
      </div>
      <MainPage @backgroundChanged="changeBackground" />
    </div>
    <Background id="background_default" :gameBackground="gameBackground" />
  </div>
</template>

<script>
import Background from "C:/Users/kaser/Documents/MCC_Achievement_Tracker_Nuxt/MCC_Achievement_tracker/components/Background.vue";
export default {
  head() {
    return {
      title: `${this.$route.params.user}'s Achievements`,
      meta: [
        {
          hid: "description",
          name: "Main Achievement Tracker",
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

  props: {
    wasRedirected: { default: false },
  },

  created() {
    if (this.wasRedirected == false) {
      //searchUser();
    }
  },

  methods: {
    changeBackground(selectedGame) {
      this.gameBackground = `/game_backgrounds/${selectedGame}_background.mp4`
    },

    goHome() {
      this.$router.push(`/`);
    },

    async searchUser(userGamerID) {
      try {
        const res = await axios.get(`/api/data/xbox/${userGamerID}`);
        if (res.data == false) {
          this.userNotFound = true;
          this.$router.push(`/`);
        } else {
          this.usersCompletedAchievements = JSON.stringify(res.data);
          console.log(
            `${userGamerID}'s achievement data is: ${this.usersCompletedAchievements}`
          );
        }
      } catch (err) {
        console.log("error!: " + err);
      }
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
  width: 100px;
}
#mainpage_div {
  margin-left: 15%;
  position: absolute;
  z-index: 1;
}

h6 {
  color: white;
}
</style>