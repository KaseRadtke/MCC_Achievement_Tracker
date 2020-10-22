<template>
  <div class="container" id="welcomeContainer">
    <Logo />
    <h1 class="title">MCC Achievement Tracker</h1>
    <div id="bio">
      <p class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
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
              userAchievementsMaster: usersAchievements,
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

    translateUsersAchievements(usersAchievements) {
      for (var achievement in usersAchievements) {
        switch (usersAchievements[achievement].name) {
          case "New Ways to Save a Quid":
            usersAchievements[achievement].name = "New Ways to Save a Buck";
            break;
          case "Record Shop Owner":
            usersAchievements[achievement].name = "Record Store Owner";
            break;
          case "Vandalised":
            usersAchievements[achievement].name = "Vandalized";
            break;
          case "Monopolised":
            usersAchievements[achievement].name = "Monopolized";
            break;
          case "Feet, Don't Fail Me Now":
            usersAchievements[achievement].name = "Feet Don't Fail Me Now";
            break;
          case "One-Way Ride":
            usersAchievements[achievement].name = "One Way Ride";
            break;
          case "The Good, The Bad and The Dead":
            usersAchievements[achievement].name =
              "The Good, The Bad, and The Dead";
            break;
          case "Battle-Hardened":
            usersAchievements[achievement].name = "Battle Hardened";
            break;
          case "Long-Time Fan":
            usersAchievements[achievement].name = "Long Time Fan";
            break;
          case "World Traveller":
            usersAchievements[achievement].name = "World Traveler";
            break;
          case "Generous Tipper":
            usersAchievements[achievement].name = "Just the Tip";
            break;
          case "An Earful":
            usersAchievements[achievement].name = "An Ear Full";
            break;
          case "Would It've Killed You To Take The Lift":
            usersAchievements[achievement].name = "Would It've Killed You To Take The Elevator";
            break;
          case "Knowledgeable":
            usersAchievements[achievement].name = "Knowledgable";
            break;
          case "Enamoured":
            usersAchievements[achievement].name = "Enamored";
            break;
        }
      }

      return usersAchievements;
    },

    filterAchievements(usersAchievements) {
      var count = 0;
      console.log(usersAchievements[699].name);
      this.translateUsersAchievements(usersAchievements);
      for (var x in this.mccTrackerAchievements) {
        for (var y in usersAchievements) {
          if (
            this.mccTrackerAchievements[x].name === usersAchievements[y].name
          ) {
            switch (usersAchievements[y].progressState) {
              case "Achieved":
                this.mccTrackerAchievements[x].progressState = "unlocked";
                break;
              case "NotStarted":
                this.mccTrackerAchievements[x].progressState = "locked";
                break;
            }
            count++;
          }
        }
      }
      console.log(usersAchievements[699].name);
      return this.mccTrackerAchievements;
    },
  },
};
</script>

<style>
#notFoundText {
  color: rgb(252, 65, 65);
}

#bio {
  width: 70%;
  line-height: 2;
  padding-top: 10px;
  padding-bottom: 2%;
  margin: 0 auto;
  text-align: left;
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
  width: 1200px;
  display: block;
  overflow: auto;
  min-width: 10vh;
  padding: 70px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
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