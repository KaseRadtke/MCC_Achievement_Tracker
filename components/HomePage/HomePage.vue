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
    async searchUser(userGamerID) {
      this.$nuxt.$loading.start();
      try {
        var res = await axios.get(`/api/data/xbox/${userGamerID}`);
        if (res.data == false) {
          this.$nuxt.$loading.finish();
          this.userNotFound = true;
        } else {
          var usersAchievements = await this.filterAchievements(res.data);
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

    filterAchievements(usersAchievements) {
      var achievementUnlockCounter = 0;
      for (var x in this.mccTrackerAchievements) {
        for (var y in usersAchievements) {
          if (
            this.mccTrackerAchievements[x].name === usersAchievements[y].name || this.mccTrackerAchievements[x]?.altname === usersAchievements[y].name
          ) {
            switch (usersAchievements[y].progressState.toLowerCase()) {
              case "achieved":
                this.mccTrackerAchievements[x].progressState = "unlocked";
                achievementUnlockCounter++;
                break;
              case "notstarted":
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
