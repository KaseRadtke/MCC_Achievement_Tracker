<template src='./template.html'></template>
<style src='./style.css'></style>
<script>
import axios from "axios";
import SearchUser from "../SearchUser/SearchUser.vue";
import MCCTrackerLogo from "../MCCTrackerLogo/MCCTrackerLogo.vue"

const xboxMasterJSON = require("../../static/mcc_achievement_master.json");

export default {
  name: "HomePage",

  components: {
    SearchUser,
    MCCTrackerLogo,
  },

  props: {
    wasRedirected: { default: false },
  },

  data() {
    return {
      userNotFound: false,
      platform_id: "Xbox LIVE Gamertag",
      mccTrackerAchievements: xboxMasterJSON,
    };
  },

  methods: {
    async searchUser(userGamerID, platform) {
      this.$nuxt.$loading.start();
      try {
        var res = await axios.get(`/api/data/${platform}/${userGamerID}`);
        if (res.data == false) {
          this.$nuxt.$loading.finish();
          this.userNotFound = true;
        } else {
          var usersAchievements = await this.filterAchievements(res.data, platform);
          this.$router.push({
            name: `api-xbox-user`,
            params: {
              user: userGamerID,
              userAchievementsMaster: usersAchievements.filteredAchievements,
              userUnlockedAchievements: usersAchievements.unlockedAchievements,
            },
          });
        }
      } catch (err) {
        console.log("error!: " + err);
      }
    },

    changePlatformText(selectedPlatform) {
      this.platform_id = selectedPlatform;
      this.userNotFound = false;
    },

    filterAchievements(usersAchievements, platform) {
      var achievementUnlockCounter = 0;
      var nameKey = platform === "xbox" ? "name" : "apiname";
      var progressKey = platform === "xbox" ? "progressState" : "achieved";
      for (var x in this.mccTrackerAchievements) {
        for (var y in usersAchievements) {
          if (
            this.mccTrackerAchievements[x][nameKey] === usersAchievements[y][nameKey] || this.mccTrackerAchievements[x]?.altname === usersAchievements[y][nameKey]
          ) {
            switch (usersAchievements[y][progressKey]) {
              case "Achieved":
              case 1:
                this.mccTrackerAchievements[x].progressState = "unlocked";
                achievementUnlockCounter++;
                break;
              case "NotStarted":
              case 0:
                this.mccTrackerAchievements[x].progressState = "locked";
                break;
            }
          }
        }
      }
      return {
        filteredAchievements: this.mccTrackerAchievements,
        unlockedAchievements: achievementUnlockCounter,
      };
    },
  },
};
</script>
