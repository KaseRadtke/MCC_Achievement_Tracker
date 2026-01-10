<template>
  <div>
    <div id="mainpage_div">
      <div v-if="achievementsLoaded" class="header" @click="goHome">
        <MCCTrackerLogo id="mainpage_logo" />
        <h6 class="tracker_title">MCC Achievement Tracker</h6>
        <p class="gamertag">{{ $route.params.user }}</p>
      </div>
      <AchievementTracker
        v-if="achievementsLoaded"
        :initialAchievements="userAchievementsMaster"
        :initialUnlockedCount="userUnlockedAchievements"
        @backgroundChanged="changeBackground"
      />
      <div v-else class="loading-wrapper">
        <div class="loading-container">
          <MCCTrackerLogo class="loading-logo" />
          <p class="loading-text">Loading achievements...</p>
        </div>
      </div>
    </div>
    <Background id="background_default" :gameBackground="gameBackground" />
  </div>
</template>

<script>
import axios from "axios";
import Background from "../../../../components/Background/Background.vue";
import AchievementTracker from "../../../../components/AchievementTracker/AchievementTracker.vue";
import MCCTrackerLogo from "../../../../components/MCCTrackerLogo/MCCTrackerLogo.vue";

const xboxMasterJSON = require("../../../../static/mcc_achievement_master.json");

export default {
  components: {
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
      achievementsLoaded: false,
      userAchievementsMaster: [],
      userUnlockedAchievements: 0,
    };
  },

  async mounted() {
    // Check if data was passed via router
    if (this.$route.params.userAchievementsMaster) {
      this.userAchievementsMaster = this.$route.params.userAchievementsMaster;
      this.userUnlockedAchievements = this.$route.params.userUnlockedAchievements;
      this.achievementsLoaded = true;
    } else {
      // Data not passed, fetch it ourselves
      await this.fetchAchievements();
    }
  },

  methods: {
    async fetchAchievements() {
      const userGamerId = this.$route.params.user;

      try {
        const { data } = await axios.get(`/api/data/xbox/${userGamerId}`);

        if (!data) {
          // User not found, redirect home
          this.$router.push('/');
          return;
        }

        const userAchievements = this.filterAchievements(data);
        this.userAchievementsMaster = userAchievements.filteredAchievements;
        this.userUnlockedAchievements = userAchievements.unlockedAchievements;
        this.achievementsLoaded = true;
      } catch (error) {
        console.error('Error fetching achievements:', error);
        this.$router.push('/');
      }
    },

    filterAchievements(usersAchievements) {
      const mccTrackerAchievements = JSON.parse(JSON.stringify(xboxMasterJSON));
      let achievementUnlockCounter = 0;

      mccTrackerAchievements.forEach(achievement => {
        const userAchievement = usersAchievements.find(
          ua => ua.name === achievement.name || ua.name === achievement.altname
        );

        if (userAchievement) {
          const progressState = userAchievement.progressState.toLowerCase();

          if (progressState === 'achieved') {
            achievement.progressState = 'unlocked';
            achievementUnlockCounter++;
          } else if (progressState === 'notstarted') {
            achievement.progressState = 'locked';
          }
        }
      });

      return {
        filteredAchievements: mccTrackerAchievements,
        unlockedAchievements: achievementUnlockCounter,
      };
    },

    changeBackground(selectedGame) {
      this.gameBackground = `/game_backgrounds/${selectedGame}_background.mp4`;
    },

    goHome() {
      this.$router.push('/');
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
  padding-bottom: 0.75rem;
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

/* Loading State */
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  max-width: 400px;
  width: 100%;
}

.loading-logo {
  width: 80px;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.loading-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
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
    padding: 0;
  }

  .header {
    width: 160px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  #mainpage_logo {
    width: 50%;
    padding-top: 0.25rem;
  }

  .tracker_title {
    display: none;
  }

  .gamertag {
    font-size: 13px;
    margin-top: 0.25rem;
  }

  .loading-wrapper {
    padding: 1rem;
    min-height: 50vh;
  }

  .loading-container {
    padding: 2rem 1.5rem;
    max-width: 90%;
  }

  .loading-logo {
    width: 60px;
  }

  .loading-text {
    font-size: 1rem;
  }
}

/* Small Mobile */
@media screen and (max-width: 480px) {
  #mainpage_div {
    padding: 0;
  }

  .header {
    width: 140px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  #mainpage_logo {
    width: 50%;
    padding-top: 0.25rem;
  }

  .gamertag {
    font-size: 12px;
  }

  .loading-container {
    padding: 1.5rem 1rem;
  }

  .loading-logo {
    width: 50px;
  }

  .loading-text {
    font-size: 0.9375rem;
  }
}
</style>
