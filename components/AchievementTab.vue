<template>
  <div class="achievement_tab" @click.stop="achievementClicked()">
    <img :src="achievementThumbnail[0].thumbnail" class="achievement_icon" />
    <h6 class="achievement_title">{{ achievementName }}</h6>
    <h6 class="achievement_description">{{ achievementDescription }}</h6>
    <p class="achievement_value">{{ achievementValue }}</p>
    <img
      src="../static/icons/gamescore_icon_tab.png"
      alt="gamerscore_value_icon"
      class="gamerscore_icon"
    />
  </div>
</template>

<script>
export default {
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

<style>
.achievement_tab {
  border: 1px solid rgb(105, 105, 105);
  border-radius: 10px;
  background: rgb(18, 42, 42);
  background: linear-gradient(
    0deg,
    rgba(18, 42, 42, 1) 0%,
    rgba(35, 34, 54, 1) 100%
  );
  cursor: pointer;
  position: relative;
}

.achievement_tab:hover {
  background: rgb(35, 84, 84);
  background: linear-gradient(
    0deg,
    rgba(35, 84, 84, 1) 0%,
    rgba(65, 64, 89, 1) 100%
  );
}

.achievement_description {
  color: rgb(184, 184, 184);
  font-size: 14px;
  position: absolute;
  margin-left: 6em;
  margin-top: -3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
}

.achievement_title {
  color: white;
  font-size: 16px;
  margin-left: 5em;
  margin-top: 10px;
}

.achievement_value {
  color: white;
  margin-top: -2em;
  margin-right: 7%;
  text-align: right;
}
.achievement_icon {
  position: absolute;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1em;
  border-radius: 5px;
  width: 50px;
}
.gamerscore_icon {
  width: 15px;
  position: absolute;
  margin-left: 94%;
  margin-top: -34px;
  margin-right: 30px;
}
@media screen and (min-width: 1921px) {
  .achievement_title {
    color: white;
    font-size: 16px;
    margin-left: 5em;
    margin-top: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 300px;
  }
}
</style>