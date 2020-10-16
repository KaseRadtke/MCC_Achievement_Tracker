<template>
  <div>
    <modal :show="show" @close="close">
      <h3 class="achievement_main_name">{{ achievementName }}</h3>
      <h4 class="achievement_main_value">{{ achievementValue }}</h4>
      <img class="gamerscore_icon_small" src="..\static\icons\gamerscore_icon.png">
      <p class="achievement_main_description">{{ achievementDescription }}</p>
      <img
        class="achievement_main_art"
        :src="achievementArt"
        alt="Achievement Art"
        width="100%"
      />
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
}
.gamerscore_icon_small{
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
</style>