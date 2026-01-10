<template src='./template.html'></template>
<style src='./style.css'></style>
<script>
export default {
  name: 'AchievementTile',

  props: {
    achievementName: {
      type: String,
      required: true,
    },
    achievementDescription: {
      type: String,
      required: true,
    },
    achievementValue: {
      type: Number,
      required: true,
    },
    achievementThumbnail: {
      type: Array,
      required: true,
    },
    achievementArt: {
      type: String,
      required: true,
    },
    achievementTutorial: String,
    achievementMaps: Array,
    videoTutorial: String,
    imageTutorial: String,
    gameTitlesArray: Array,
    currentGame: String,
    searchCriteria: Array,
  },

  methods: {
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
};
</script>
