<template src="./template.html"></template>
<style src='./style.css'></style>

<script>
import GamesNavBar from "../GamesNavBar/GamesNavBar.vue";
import SearchForAchievement from "../SearchForAchievement/SearchForAchievement.vue";
import AchievementTile from "../AchievementTile/AchievementTile.vue";
import AchievementDetailModal from "../AchievementDetailsModal/AchievementDetailModal.vue";
import mccMasterTrackerJSON from "../../static/mcc_achievement_master.json";

export default {
  name: "AchievementTracker",

  components: {
    GamesNavBar,
    SearchForAchievement,
    AchievementTile,
    AchievementDetailModal,
  },

  props: {
    initialAchievements: {
      type: Array,
      default: () => [],
    },
    initialUnlockedCount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      achievementsCalculated: 0,
      game: "reach",
      filterAchievementState: "locked",
      achievementsJSON: [],
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
      mobileMenuOpen: false,
    };
  },


  computed: {
    filteredAchievementsJSON() {
      return this.achievementsJSON.filter(
        (achievement) =>
          achievement.titles.includes(this.game) &&
          this.searchCriteria.some((val) => achievement.maps.includes(val)) &&
          this.searchCriteria.some((val) => achievement.mode.includes(val)) &&
          achievement.progressState === this.filterAchievementState
      );
    },
  },

  watch: {
    // Close mobile menu when filters change
    searchCriteria() {
      if (window.innerWidth <= 768) {
        this.mobileMenuOpen = false;
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });

    // Close mobile menu when clicking achievement
    this.$on('achievementSelected', () => {
      if (window.innerWidth <= 768) {
        this.mobileMenuOpen = false;
      }
    });
  },

  created() {
    // Use passed-in data
    this.achievementsJSON = this.initialAchievements.length
      ? this.initialAchievements
      : JSON.parse(JSON.stringify(mccMasterTrackerJSON));

    this.achievementsCalculated = this.initialUnlockedCount
      ? 700 - this.initialUnlockedCount
      : 700;

    if (this.achievementsCalculated === 0) {
      this.$confetti.start();
    }
  },

  methods: {
    gameSelected(selectedGame) {
      this.game = selectedGame;
      this.$emit("backgroundChanged", this.game);
    },

    searchForAchievement(searchedAchievementName) {
      const achievement = mccMasterTrackerJSON.find(
        (ach) => ach.name.toLowerCase() === searchedAchievementName.toLowerCase()
      );

      if (achievement) {
        this.openAchievement(
          achievement.name,
          achievement.description,
          achievement.value,
          achievement.mediaAssets[0].url,
          achievement.tutorial,
          achievement.video_tutorial,
          achievement.image_tutorial
        );
      }
    },

    getSearchCriteria(gameSelectionArray) {
      this.searchCriteria = gameSelectionArray;
    },

    showModal() {
      return this.activeModal !== 0;
    },

    toggleModal(id = 0) {
      this.activeModal = this.activeModal === 0 ? id || 1 : 0;
    },

    toggleLockButton() {
      if (this.filterAchievementState === "locked") {
        this.filterAchievementState = "unlocked";
        this.lockSymbol = require("../../static/icons/achievement_unlocked.png");
        this.$confetti.stop();
        this.achievementsCalculated = this.$route.params.userUnlockedAchievements;
      } else {
        this.filterAchievementState = "locked";
        this.lockSymbol = require("../../static/icons/achievement_locked.png");
        this.achievementsCalculated =
          700 - this.$route.params.userUnlockedAchievements;

        if (this.achievementsCalculated === 0) {
          this.$confetti.start();
        }
      }
    },

    openAchievement(
      receivedAchievementName,
      receivedAchievementDescription,
      receivedAchievementValue,
      receivedAchievementArt,
      receivedAchievementTutorial,
      receivedVideoTutorial,
      receivedImageTutorial
    ) {
      this.achievementName = receivedAchievementName;
      this.achievementDescription = receivedAchievementDescription;
      this.achievementValue = receivedAchievementValue;
      this.achievementArt = receivedAchievementArt;
      this.achievementTutorial = receivedAchievementTutorial;
      this.videoTutorial = receivedVideoTutorial;
      this.imageTutorial = receivedImageTutorial;
      this.toggleModal();
    },
  },
};
</script>
