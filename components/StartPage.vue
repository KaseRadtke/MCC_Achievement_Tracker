<template>
  <div class="container" id="welcomeContainer">
    <Logo />
    <h1 class="title">MCC Achievement Tracker</h1>
    <div id="bio">
      <p class="description">
        Track and get guides for all 700 achievements in Halo: The Master Chief
        Collection! MCC Achievement Tracker lets you filter achievements by
        individual game, gamemode, and map they can be unlocked on. Click any
        achievement to instantly open up a guide.
      </p>
    </div>
    <div id="search_content">
      <SearchUser
        @search-user="searchUser"
        @platformSelected="changePlatformText"
      />
    </div>
    <h6 id="notFoundText" v-if="userNotFound">
      Xbox LIVE Gamertag not found. Are you sure you spelled it correctly?
    </h6>
    <p class="instructions">
      Enter your {{ platform_id }} to pull your current achievement progress for
      Halo: The Master Chief Collection
    </p>
    <div class="author_links">
      <a href="https://www.twitter.com/NoWise10">
        <img
          class="twitter_bird_logo"
          src="../static/icons/Twitter_Bird_Logo.svg"
          alt="d"
        />
        <p class="made_by">Made with love by Kase Radtke</p>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchUser from "../components/SearchUser";

const xboxMasterJSON = require("../static/mcc_achievement_master.json");

export default {
  name: "StartPage",

  components: {
    SearchUser,
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
        const res = await axios.get(`/api/data/xbox/${userGamerID}`);
        if (res.data == false) {
          this.$nuxt.$loading.finish();
          this.userNotFound = true;
        } else {
          const usersAchievements = await this.filterAchievements(res.data);
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
            this.mccTrackerAchievements[x].name === usersAchievements[y].name
          ) {
            switch (usersAchievements[y].progressState.toLowerCase()) {
              case "achieved":
                this.mccTrackerAchievements[x].progressState = "unlocked";
                achievementUnlockCounter++;
                break;
              case "notStarted":
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

<style>
.author_links {
  cursor: pointer;
  height: 2px;
}
.twitter_bird_logo {
  filter: invert(100%);
  padding-top: 2em;
  margin-left: -0.7em;
  position: absolute;
}
.made_by {
  padding-top: 4.5em;
  color: white;
  font-size: 12px;
}
#notFoundText {
  color: rgb(252, 65, 65);
}

#bio {
  width: 70%;
  line-height: 2;
  padding-top: 10px;
  padding-bottom: 2%;
  margin: 0 auto;
}

#search_content {
  display: table;
  margin: 0 auto;
}

.instructions {
  width: 55%;
  padding-top: 15px;
  color: #c4c4c4;
  margin: auto;
}

.description {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #c4c4c4;
  font-size: 20px;
  margin-left: 20px;
}
.container #welcomeContainer {
      border: rgb(230, 230, 230) solid 2px;
    border-radius: 25px;
    margin-top: 5%;
 
    padding-right: 3%;
    padding-left: 3%;
    padding-top: 1.5%;
    padding-bottom: 1%;
 
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    position: absolute;
    z-index: 100;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #ffffff;
  letter-spacing: 1px;
  padding-bottom: 10px;
}
</style>