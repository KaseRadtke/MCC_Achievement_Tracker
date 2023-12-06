<template src="./template.html"></template>
<style src='./style.css'></style>

<script>
import GamesNavBar from "../GamesNavBar/GamesNavBar.vue";
import SearchForAchievement from "../SearchForAchievement/SearchForAchievement.vue";
import AchievementTile from "../AchievementTile/AchievementTile.vue";
import mccMasterTrackerJSON from "../../static/mcc_achievement_master.json";
import AchievementDetailModal from "../AchievementDetailsModal/AchievementDetailModal.vue";

export default {
  name: "AchievementTracker",
  components: {
    GamesNavBar,
    SearchForAchievement,
    AchievementTile,
    AchievementDetailModal,
  },

  data() {
    return {
      achievementsCalculated: 0,
      game: "reach",
      filterAchievementState: "locked",
      achievementsJSON: [mccMasterTrackerJSON],
      searchCriteria: [],
      activeModal: 0,
      lockSymbol: require("../../static/icons/achievement_locked.png"),
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
        this.lockSymbol = require("../../static/icons/achievement_unlocked.png");
        this.$confetti.stop();
        this.achievementsCalculated = this.$route.params.userUnlockedAchievements;
      } else {
        this.filterAchievementState = "locked";
        this.lockSymbol = require("../../static/icons/achievement_locked.png");
        this.achievementsCalculated =
          700 - this.$route.params.userUnlockedAchievements;
        if (this.achievementsCalculated == 0) {
          this.$confetti.start();
        }
      }
    },

    // The Achievenment.vue component emits a request to open up a modal, and sends the achievements data to be populated in the modal.
    // Also used with the SearchForAchievement.vue component
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