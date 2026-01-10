<template src='./template.html'></template>
<style src='./style.css' scoped></style>

<script>
import axios from 'axios';
import SearchUser from '../SearchUser/SearchUser.vue';
import MCCTrackerLogo from '../MCCTrackerLogo/MCCTrackerLogo.vue';

// Import JSON data
import xboxMasterJSON from '../../static/mcc_achievement_master.json';

export default {
  name: 'HomePage',

  components: {
    SearchUser,
    MCCTrackerLogo,
  },

  props: {
    wasRedirected: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      userNotFound: false,
      platformId: 'Xbox LIVE Gamertag',
      // Deep clone to avoid mutating the imported JSON
      mccTrackerAchievements: JSON.parse(JSON.stringify(xboxMasterJSON)),
    };
  },

  methods: {
    async searchUser(userGamerId) {
      this.$nuxt.$loading.start();
      this.userNotFound = false; // Reset error state

      try {
        const { data } = await axios.get(`/api/data/xbox/${userGamerId}`);

        if (!data) {
          this.userNotFound = true;
          return;
        }

        const userAchievements = this.filterAchievements(data);

        await this.$router.push({
          name: 'api-xbox-user',
          params: {
            user: userGamerId,
            userAchievementsMaster: userAchievements.filteredAchievements,
            userUnlockedAchievements: userAchievements.unlockedAchievements,
          },
        });
      } catch (error) {
        console.error('Error fetching user achievements:', error);
        this.userNotFound = true;
      } finally {
        this.$nuxt.$loading.finish();
      }
    },

    changePlatformText(selectedPlatform) {
      this.platformId = selectedPlatform;
      this.userNotFound = false;
    },

    filterAchievements(userAchievements) {
      let achievementUnlockCounter = 0;

      // Create a map for O(1) lookup instead of nested loops
      const userAchievementMap = new Map(
        userAchievements.map(achievement => [achievement.name, achievement])
      );

      // Update achievement progress state
      this.mccTrackerAchievements.forEach(achievement => {
        const userAchievement =
          userAchievementMap.get(achievement.name) ||
          userAchievementMap.get(achievement.altname);

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
        filteredAchievements: this.mccTrackerAchievements,
        unlockedAchievements: achievementUnlockCounter,
      };
    },
  },
};
</script>
