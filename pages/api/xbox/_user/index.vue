<template>
  <div>
    <div id="mainpage_div">
      <div class="header" @click="goHome">
        <MCCTrackerLogo id="mainpage_logo" />
        <h6 class="tracker_title">MCC Achievement Tracker</h6>
        <p class="gamertag">{{ $route.params.user }}</p>
      </div>
      <AchievementTracker @backgroundChanged="changeBackground" />
    </div>
    <Background id="background_default" :gameBackground="gameBackground" />
  </div>
</template>

<script>
import Background from "../../../../components/Background/Background.vue";
import AchievementTracker from "../../../../components/AchievementTracker/AchievementTracker.vue"
import MCCTrackerLogo from "../../../../components/MCCTrackerLogo/MCCTrackerLogo.vue"
export default {
  middleware: "redirect_check",
  components:{
    Background,
    AchievementTracker,
    MCCTrackerLogo,
  },
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
  padding-top: 1rem;
}

#mainpage_logo {
  width: 30%;
  padding-top: 0.5rem;
}

#mainpage_div {
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 0 2rem;
}

.tracker_title {
  font-size: 13px;
  margin: 0;
}

.gamertag {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  margin: 0.375rem 0 0;
  letter-spacing: 0.5px;
}

h6 {
  color: white;
}

/* Tablet */
@media screen and (max-width: 1024px) {
  #mainpage_div {
    padding: 0 1.5rem;
  }
}

/* Mobile */
@media screen and (max-width: 768px) {
  #mainpage_div {
    padding: 0 0.5rem;
  }

  .header {
    width: 160px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  #mainpage_logo {
    width: 50%; /* Changed from 100% - more reasonable size */
    padding-top: 0.25rem;
  }

  .tracker_title {
    display: none;
  }

  .gamertag {
    font-size: 13px;
    margin-top: 0.25rem;
  }
}

/* Small Mobile */
@media screen and (max-width: 480px) {
  #mainpage_div {
    padding: 0 0.375rem;
  }

  .header {
    width: 140px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  #mainpage_logo {
    width: 50%; /* Changed from 100% */
    padding-top: 0.25rem;
  }

  .gamertag {
    font-size: 12px;
  }
}
</style>
