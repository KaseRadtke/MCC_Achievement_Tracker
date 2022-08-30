<template>
  <div class="mainpage">
    <div>
      <Gamesbar @gameSelected="gameSelected" />
    </div>
    <h4 class="username">
      {{
        achievementsCalculated +
        " " +
        filterAchievementState +
        " achievements"
      }}
    </h4>
    <img
      class="toggle_lock"
      :src="lockSymbol"
      alt="symbol to toggle locked and unlocked achievements"
      @click.stop="toggleLockButton()"
    />
    <div>
      <AchievementModal
        :show="showModal()"
        @close="toggleModal()"
        :achievementName="achievementName"
        :achievementDescription="achievementDescription"
        :achievementValue="achievementValue"
        :achievementArt="achievementArt"
        :achievementTutorial="achievementTutorial"
        :videoTutorial="videoTutorial"
        :imageTutorial="imageTutorial"
      />
    </div>
    <div id="wrapper">
      <FindAchievements
        :currentGame="this.game"
        @searchCriteriaRecieved="getSearchCriteria"
        @achievementSearched="searchForAchievement"
      />
      <div class="achievements_container">
        <div class="achievements_grid">
          <AchievementTab
            v-for="achievement in filteredAchievementsJSON"
            :key="achievement.name"
            :achievementName="achievement.name"
            :achievementDescription="achievement.description"
            :achievementValue="achievement.value"
            :achievementThumbnail="achievement.mediaAssets"
            :achievementArt="achievement.mediaAssets[0].url"
            :achievementTutorial="achievement.tutorial"
            :videoTutorial="achievement.video_tutorial"
            :imageTutorial="achievement.image_tutorial"
            :gameTitlesArray="achievement.titles"
            :currentGame="game"
            :achievementMaps="achievement.maps"
            :searchCriteria="searchCriteria"
            @achievementSelected="openAchievement"
          />
        </div>
        <div v-if="achievementsCalculated == 0">
          <h1 class="congratulations_celebration_baby_oh_yeah">
            Congratulations!
          </h1>
          <h2 class="celebration_baby_oh_yeah">
            You have all 700 achievements in Halo: The Master Chief Collection!
          </h2>
        </div>
        <div class="scroll_filler"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Gamesbar from "../components/Gamesbar";
import FindAchievements from "../components/FindAchievements";
import AchievementTab from "../components/AchievementTab";
import mccMasterTrackerJSON from "../static/mcc_achievement_master.json";
import AchievementModal from "../components/AchievementModal";

export default {
  components: {
    Gamesbar,
    FindAchievements,
    AchievementTab,
    AchievementModal,
  },

  data() {
    return {
      achievementsCalculated: 0,
      game: "reach",
      filterAchievementState: "locked",
      achievementsJSON: [mccMasterTrackerJSON],
      searchCriteria: [],
      activeModal: 0,
      lockSymbol: require("../static/icons/achievement_locked.png"),
      achievementName: "",
      achievementDescription: "",
      achievementValue: 99,
      achievementArt: "",
      achievementTutorial: "",
      videoTutorial: "",
      imageTutorial: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },

  methods: {
    gameSelected(selectedGame) {
      this.game = selectedGame;
      this.$emit("backgroundChanged", this.game);
    },

    searchForAchievement(searchedAchievementName) {
      for (var achievement in mccMasterTrackerJSON) {
        if (
          mccMasterTrackerJSON[achievement].name.toLowerCase() ==
          searchedAchievementName.toLowerCase()
        ) {
          this.openAchievement(
            mccMasterTrackerJSON[achievement].name,
            mccMasterTrackerJSON[achievement].description,
            mccMasterTrackerJSON[achievement].value,
            mccMasterTrackerJSON[achievement].mediaAssets[0].url,
            mccMasterTrackerJSON[achievement].tutorial,
            mccMasterTrackerJSON[achievement].video_tutorial,
            mccMasterTrackerJSON[achievement].image_tutorial
          );
          break;
        }
      }
    },

    getSearchCriteria(gameSelectionArray) {
      this.searchCriteria = gameSelectionArray;
    },

    showModal: function (id) {
      return this.activeModal === id;
    },
    toggleModal: function (id) {
      if (this.activeModal !== 0) {
        this.activeModal = 0;
        return false;
      }
      this.activeModal = id;
    },

    toggleLockButton() {
      if (this.filterAchievementState == "locked") {
        this.filterAchievementState = "unlocked";
        this.lockSymbol = require("../static/icons/achievement_unlocked.png");
        this.$confetti.stop();
        this.achievementsCalculated = this.$route.params.userUnlockedAchievements;
      } else {
        this.filterAchievementState = "locked";
        this.lockSymbol = require("../static/icons/achievement_locked.png");
        this.achievementsCalculated =
          700 - this.$route.params.userUnlockedAchievements;
        if (this.achievementsCalculated == 0) {
          this.$confetti.start();
        }
      }
    },

    // The Achievenment.vue component emits a request to open up a modal, and sends the achievements data to be populated in the modal.
    // Also used with the FindAchievement.vue component
    openAchievement(
      recievedAchievementName,
      recievedAchievementDescription,
      recievedAchievementValue,
      recievedAchievementArt,
      recievedAchievementTutorial,
      recievedVideoTutorial,
      recievedImageTutorial
    ) {
      this.achievementName = recievedAchievementName;
      this.achievementDescription = recievedAchievementDescription;
      this.achievementValue = recievedAchievementValue;
      this.achievementArt = recievedAchievementArt;
      this.achievementTutorial = recievedAchievementTutorial;
      this.videoTutorial = recievedVideoTutorial;
      this.imageTutorial = recievedImageTutorial;
      this.toggleModal();
    },
  },

  computed: {
    // Method that updates which achievements to display.
    // Checks if achievement includes the game title, the map, the mode, and its current lock state. If it does, then the achievement is added to the filtered array and returned.
    filteredAchievementsJSON() {
      var hasMapInSearchCriteria = (currentValue) =>
        this.searchCriteria.includes(currentValue);
      return this.achievementsJSON.filter(
        (achievement) =>
          achievement.titles.includes(this.game) &&
          this.searchCriteria.some((val) => achievement.maps.indexOf(val) !== -1) &&
          this.searchCriteria.some((val) => achievement.mode.indexOf(val) !== -1) &&
          achievement.progressState === this.filterAchievementState
      );
    },
  },

  created() {
    this.achievementsJSON = this.$route.params.userAchievementsMaster;
    this.achievementsCalculated =
      700 - this.$route.params.userUnlockedAchievements;
    if (this.achievementsCalculated == 0) {
      this.$confetti.start();
    }
  },
};
</script>

<style>
.scroll_filler {
  width: 300px;
  height: 500px;
}
.achievements_container {
  grid-column: 2/3;
  grid-row: 1/11;
  margin-top: 4em;
  margin-right: 2em;
  overflow: scroll;
  scrollbar-width: none;
  height: 95vh;
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 72%);
}

.achievements_grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(70px, auto);
  grid-gap: 5px;
}
.congratulations_celebration_baby_oh_yeah {
  color: white;
  position: absolute;
  padding-left: 8em;
  padding-top: 2em;
  font-size: 50px;
}
.celebration_baby_oh_yeah {
  color: white;
  position: absolute;
  margin-left: 2vw;
  margin-top: 13vh;
  font-size: 160%;
}

.mainpage {
  border: #7e7f80 solid 2px;
  border-radius: 15px;
  margin: 0 auto;
  min-width: 1200px;
  height: 85vh;
  overflow: auto;
  min-width: 90vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

#wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: minmax(100px, auto);
  margin-top: 1em;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
@media screen and (min-width: 291px) and (max-width: 690px) {
  .username {
    color: #a2a2a2;
    position: absolute;
    padding-left: 25rem;
    padding-top: 2.2rem;
    font-family: Verdana, Geneva, sans-serif;
    font-size: 1.85vw;
  }
  .toggle_lock {
    width: 4%;
    position: absolute;
    margin-left: 22.5rem;
    padding-top: 15px;
    cursor: pointer;
  }
}
@media screen and (min-width: 691px) and (max-width: 1366px) {
  .username {
    color: #a2a2a2;
    position: absolute;
    padding-left: 26rem;
    padding-top: 2.7rem;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: 1.85vw;
  }

  .toggle_lock {
    width: 5%;
    position: absolute;
    margin-left: 22.5rem;
    padding-top: 25px;
    cursor: pointer;
  }
  .congratulations_celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    padding-left: 6vw;
    padding-top: 1em;
    font-size: 40px;
  }
  .celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    text-align: center;
    width: 320px;
    margin-left: 5vw;
    margin-top: 15vh;
    font-size: 18px;
  }
  .achievements_grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(70px, auto);
    grid-gap: 5px;
  }
}

@media screen and (min-width: 1367px) and (max-width: 1600px) {
  .username {
    color: #a2a2a2;
    position: absolute;
    padding-left: 27.5rem;
    padding-top: 2.6rem;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: 1.4vw;
  }

  .toggle_lock {
    width: 2.6vw;
    position: absolute;
    margin-left: 24rem;
    padding-top: 25px;
    cursor: pointer;
  }
  .congratulations_celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    padding-left: 12vw;
    padding-top: 2em;
    font-size: 40px;
  }
  .celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    margin-left: 3vw;
    margin-top: 17vh;
    font-size: 20px;
  }
  .achievements_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(70px, auto);
    grid-gap: 5px;
  }
}

@media screen and (min-width: 1601px) and (max-width: 1920px) {
  .username {
    color: #a2a2a2;
    position: absolute;
    padding-left: 28.3rem;
    padding-top: 2.2rem;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: 1.6vw;
  }

  .toggle_lock {
    width: 2.2vw;
    position: absolute;
    margin-left: 25rem;
    padding-top: 25px;
    cursor: pointer;
  }

  .congratulations_celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    padding-left: 13vw;
    padding-top: 2em;
    font-size: 50px;
  }
  .celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    margin-left: 3vw;
    margin-top: 17vh;
    font-size: 160%;
  }
  .achievements_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(70px, auto);
    grid-gap: 5px;
  }
}
@media screen and (min-width: 1921px) {
  .username {
    color: #a2a2a2;
    position: absolute;
    padding-left: 31.5rem;
    padding-top: 1.2em;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: 1.2vw;
  }
  .toggle_lock {
    width: 2vw;
    position: absolute;
    margin-left: 440px;
    padding-top: 20px;
    cursor: pointer;
  }
  .congratulations_celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    padding-left: 17vw;
    padding-top: 2em;
    font-size: 50px;
  }
  .celebration_baby_oh_yeah {
    color: white;
    position: absolute;
    margin-left: 9vw;
    margin-top: 9vw;
    font-size: 160%;
  }
}

@media screen and (min-width: 691px) and (max-width: 1200px) {
  .mainpage {
    border: #7e7f80 solid 2px;
    border-radius: 15px;
    margin: 0 auto;
    min-width: 1200px;
    height: 85vh;
    overflow: auto;
    min-width: 90vh;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }
}

@media screen and (max-width: 960px) {
  #background_default {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  #mainpage_div {
    top: 0;
    left: 0;
    padding-right: 0;
    padding-left: 0;
    width: 100%;
  }
  .mainpage {
    min-width: unset;
  }
  .achievements_grid {
    grid-template-columns: 1fr;
  }
  #filter_achievements:not(.active) {
    display: none;
    /* you would have to implement a button to toggle the filters on/off the screen 
         * in Vue, you can do something like 
         * <div id="filter_achievements :class="{'active': menuOpen}"></div> 
         * and a button like <button type="button" @click="() => { menuOpen = !menuOpen }">menu</button>
         */
  }
  #wrapper {
    display: block;
  }
  .achievements_container {
    margin-right: unset;
  }
  .username {
    padding-left: 75px;
    padding-top: 12px;
    font-size: 18px;
  }
  .toggle_lock {
    margin-left: unset;
    left: 12px;
    width: 45px;
  }
}
</style>