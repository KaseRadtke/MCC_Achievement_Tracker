<template>
  <div>
    <modal :show="show" @close="close">
      <h3 class="achievement_main_name">{{ achievementName }}</h3>
      <h4 class="achievement_main_value">{{ achievementValue }}</h4>
      <img
        class="gamerscore_icon_small"
        :src="require('../static/icons/gamerscore_icon.png')"
      />
      <p class="achievement_main_description">{{ achievementDescription }}</p>
      <img
        class="achievement_main_art"
        :src="achievementArt"
        alt="Achievement Art"
        width="100%"
      />
      <div v-show="videoTutorial.length > 1" class="videoWrapper">
      <iframe
        v-show="videoTutorial.length > 1"
        class="video_tutorial"
        width="100%"
        height="47%"
        :src="videoTutorial"
        frameborder="0"
      >
      </iframe>
      </div>
      <img
        v-show="videoTutorial.length == 0"
        class="no_video_background"
        :src="imageTutorial"
      />
      <img
        v-show="videoTutorial.length == undefined"
        class="no_video_background"
        :src="require('../static/icons/video_false_background.png')"
      />
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
    "imageTutorial",
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
  font-size: 1.3vw;
  z-index: 100;
  padding-top: 0.1em;
  padding-left: 25vw;
}
.gamerscore_icon_small {
  width: 1vw;
  position: absolute;
  z-index: 100;
  margin-left: 26.5vw;
  margin-top: 0.5vh;
}

.achievement_main_description {
  position: absolute;
  z-index: 100;
  color: #dedede;
  padding-left: 4em;
  padding-top: 2.5em;
  font-style: italic;
  font-size:0.6vw;
}
.achievement_main_tutorial {
  position: relative;
  z-index: 100;
  color: white;
  padding-left: 1em;
  padding-top: 0.9em;
  font-size: 0.7vw;
}

.achievement_main_name {
  position: absolute;
  padding-left: 1em;
  padding-top: 0.5em;
  color: white;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  z-index: 100;
  font-size: 1vw;
}
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video_tutorial {
  padding-top: 1em;
   position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.no_video_background {
  width: 100%;
  padding-top: 1em;
}

@media only screen and (min-device-width: 1200) and (max-width: 2000){
  .gamerscore_icon_small {
    width: 3vw;
    position: absolute;
    z-index: 100;
    margin-left: 30em;
    margin-top: 0.5em;
  }
}
</style>