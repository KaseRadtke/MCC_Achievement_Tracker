<template>
  <div>
    <modal :show="show" @close="close">
      <h3 class="achievement_main_name">{{ achievementName }}</h3>
      <h4 class="achievement_main_value">{{ achievementValue }}</h4>
      <img
        class="gamerscore_icon_small"
        src="..\static\icons\gamerscore_icon.png"
      />
      <p class="achievement_main_description">{{ achievementDescription }}</p>
      <img
        class="achievement_main_art"
        :src="achievementArt"
        alt="Achievement Art"
        width="100%"
      />
      <iframe
        v-show="videoTutorial.length > 1"
        class="video_tutorial"
        width="100%"
        height="47%"
        :src="videoTutorial"
        frameborder="0"
      >
      </iframe>
      <img v-show="videoTutorial.length == 0" class="no_video_background" :src="imageTutorial">
      <img v-show="videoTutorial.length == undefined" class="no_video_background" src="../static/videofalse_background.png">
      <h6 class="achievement_main_tutorial">{{ achievementTutorial }}</h6>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  props: [
    "show",
    "achievementName",
    "achievementDescription",
    "achievementValue",
    "achievementArt",
    "achievementTutorial",
    "videoTutorial",
    "imageTutorial"
  ],
  components: { Modal },
  methods: {
    close: function () {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.achievement_main_art {
  position: relative;
}
.achievement_main_value {
  position: absolute;
  color: white;
  z-index: 100;
  padding-top: 0.5em;
  padding-left: 30.8em;
}
.achievement_main_description {
  position: absolute;
  z-index: 100;
  color: #dedede;
  padding-left: 4em;
  padding-top: 2.9em;
  font-style: italic;
}
.achievement_main_tutorial {
  position: relative;
  z-index: 100;
  color: white;
  padding-left: 2em;
    padding-top: 0.5em;
}
.gamerscore_icon_small {
  width: 25px;
  position: absolute;
  z-index: 100;
  margin-left: 48em;
  margin-top: 0.6em;
}
.achievement_main_name {
  position: absolute;
  padding-left: 1em;
  padding-top: 0.5em;
  color: white;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  z-index: 100;
}
.video_tutorial{
    padding-top: 1em;
}
.no_video_background{
    width: 100%;
    padding-top: 1em;
}
</style>