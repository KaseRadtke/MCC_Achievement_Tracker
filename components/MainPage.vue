<template>
  <div id="mainpage">
    <div>
      <Gamesbar @gameSelected="gameSelected" />
    </div>

    <div id="wrapper">
      <FilterAchievements
        :currentGame="this.game"
        @searchCriteriaRecieved="getSearchCriteria"
      />
      <div id="achievements_div">
        <div id="achievements_grid">
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
          />
        </div>
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
      filterAchievementState: "unlocked",
      achievementsJSON: json,
      searchCriteria: [],
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
      this.$emit("backgroundChanged", this.game)
    },

    getSearchCriteria(gameSelectionArray) {
      this.searchCriteria = gameSelectionArray;
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
};
</script>

<style>
#achievements_div {
  grid-column: 2/3;
  grid-row: 1/11;
  margin-top: 2em;
  margin-right: 2em;
}

#achievements_grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(70px, auto);
  grid-gap: 5px;
}

#mainpage {
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
</style>