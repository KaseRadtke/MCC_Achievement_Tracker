<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
import ModalTemplate from "../ModalTemplate/ModalTemplate.vue"

export default {
  name:"AchievementDetailModal",
  props: [
    "show",
    "achievementName",
    "achievementDescription",
    "achievementValue",
    "achievementArt",
    "achievementTutorial",
    "videoTutorial",
    "imageTutorial",
  ],
  components: { ModalTemplate },
  methods: {
    close: function () {
      this.$emit("close");
    },
  },
};
</script>