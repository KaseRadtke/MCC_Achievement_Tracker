<template src='./template.html'></template>
<style src='./style.css'></style>
<script>
export default {
  name: 'AchievementTile',
  data() {
    return {
      activeModal: 0,
    };
  },

  methods: {
    showModal(id) {
      return this.activeModal === id;
    },
    toggleModal(id) {
      if (this.activeModal !== 0) {
        this.activeModal = 0;
        return false;
      }
      this.activeModal = id;
    },

    achievementClicked() {
      this.$emit(
        "achievementSelected",
        this.achievementName,
        this.achievementDescription,
        this.achievementValue,
        this.achievementArt,
        this.achievementTutorial,
        this.videoTutorial,
        this.imageTutorial
      );
    },
  },
  props: {
    achievementName: String,
    achievementDescription: String,
    achievementValue: Number,
    achievementThumbnail: Array,
    achievementArt: String,
    achievementTutorial: String,
    achievementMaps: Array,
    videoTutorial: String,
    imageTutorial: String,
    gameTitlesArray: Array,
    currentGame: String,
    searchCriteria: Array,
  },
};
</script>
