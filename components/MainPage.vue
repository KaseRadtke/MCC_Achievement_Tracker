<template>
  <div class="mainpage">
    <div>
      <Gamesbar @gameSelected="gameSelected" />
    </div>
    <img
      class="toggle_lock"
      :src="lockSymbol"
      alt="symbol to toggle locked and unlocked achievements"
      @click.stop="toggleLockButton()"
    />
    <div>
      <AchievementGuideModal
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
      <FilterAchievements
        :currentGame="this.game"
        @searchCriteriaRecieved="getSearchCriteria"
      />
      <div class="achievements_container">
        <div class="achievements_grid">
          <Achievement
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
        <div class="scroll_filler"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Gamesbar from "../components/Gamesbar";
import FilterAchievements from "../components/FilterAchievements";
import Achievement from "../components/Achievement";
import json from "../static/mcc_achievement_master.json";

export default {
  components: {
    Gamesbar,
    FilterAchievements,
    Achievement,
  },

  data() {
    return {
      game: "reach",
      filterAchievementState: "locked",
      achievementsJSON: json,
      searchCriteria: [],
      activeModal: 0,
      lockSymbol: require("../static/achievement_locked.png"),
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
        this.lockSymbol = require("../static/achievement_unlocked.png");
      } else {
        this.filterAchievementState = "locked";
        this.lockSymbol = require("../static/achievement_locked.png");
      }
    },

    // The Achievenment.vue component emits a request to open up a modal, and sends the achievements data to be populated in the modal.
    // This had to be done here as the webkit-mask-image attribute in the CSS caused a bug with opening a modal in the div with that attribute.
    // Not sure if this could be done in a prettier way, but it gets the job done!
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
      const hasMapInSearchCriteria = (currentValue) =>
        this.searchCriteria.includes(currentValue);
      return this.achievementsJSON.filter(
        (i) =>
          i.titles.includes(this.game) &&
          this.searchCriteria.some((val) => i.maps.indexOf(val) !== -1) &&
          this.searchCriteria.some((val) => i.mode.indexOf(val) !== -1) &&
          i.progressState === this.filterAchievementState
      );
    },
  },

  created() {
    console.log(this.$route.params.user)
  },
};
</script>

<style>
.toggle_lock {
  width: 35px;
  position: absolute;
  left: 27.5em;
  padding-top: 15px;
  cursor: pointer;
}
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
  height: 80em;
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 72%);
}

.achievements_grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(70px, auto);
  grid-gap: 5px;
}

.mainpage {
  border: #7e7f80 solid 2px;
  border-radius: 15px;
  margin: 0 auto;
  width: 110rem;
  height: 72rem;
  overflow: auto;
  min-width: 10vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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
</style>