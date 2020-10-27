<template>
  <div id="filter_achievements">
    <div class="search">
      <div class="search_header"><h5 class="heading">Search Criteria</h5></div>
      <b-form class="achievement_form" @submit.prevent="onSubmit">
        <div class="form-group mx-sm-3 mb-2 search_achievement_bar">
          <b-input
            type="text"
            class="form-control"
            name="achievement_search"
            v-model="achievementName"
            placeholder="Search for specific achievement"
          ></b-input>
          <b-button
            variant="primary"
            type="submit"
            value="Search Achievements"
            :disabled="!isFilledOut"
            >Find Achievement</b-button
          >
          <h6 id="achievement_not_found" v-if="achievementNotFound == true">
            Achievement not found. Are you sure you spelled it correctly?
          </h6>
        </div>
      </b-form>
    </div>
    <GameSearchSettings
      :currentGame="currentGame"
      :gameData="
        require(`../static/game_settings/${currentGame}_search_settings.json`)
      "
      @gameSelection="gameSelection"
    />
  </div>
</template>

<script>
import GameSearchSettings from "../components/GameSearchSettings";

export default {
  name: "FindAchievements",

  data() {
    return {
      achievementNotFound: false,
      achievementName: "",
    };
  },

  methods: {
    gameSelection(gameSelectionArray) {
      this.$emit("searchCriteriaRecieved", gameSelectionArray);
    },
    onSubmit: function () {
      this.$emit("achievementSearched", this.achievementName);
    },
  },

  computed: {
    isFilledOut() {
      return this.achievementName;
    },
  },

  components: {
    GameSearchSettings,
  },

  props: {
    currentGame: String,
  },
};
</script>

<style>
#achievement_not_found {
  color: rgb(252, 65, 65);
  margin-top: 5px;
  position: absolute;
  width: 400px;
  margin-left: -30px; /* Sloppy but it works ;) */
  overflow: visible;
}

.criteria_selection {
  padding-top: 2em;
}
.selection_heading {
  color: #ffffff;
  font-size: 17px;
}

.form-check {
  margin-left: 0em;
}

#filter_achievements {
  grid-column: 1;
  grid-row: 1/11;
}

.heading {
  font-size: 18px;
  padding-bottom: 10px;
}
.search_header {
  text-align: left;
  color: white;
  padding-left: 2em;
  margin-top: 2em;
}
.search_achievement_bar {
  flex-flow: nowrap;
  width: 20em;
  text-align: center;
}

.achievement_form {
  padding-left: 3em;
}

.form-check {
  color: white;
}

.header {
  color: white;
}

@media screen and (min-width: 691px) and (max-width: 1366px) {
  #filter_achievements {
    grid-column: 1;
    grid-row: 1/11;
    transform: scale(0.75);
    padding-top: -50;
    margin-top: -160px;
    margin-left: -40px;
  }
}
</style>