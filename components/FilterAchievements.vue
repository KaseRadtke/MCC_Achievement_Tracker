<template>
  <div id="filter_achievements">
    <div class="search">
      <div class="search_header"><h5 class="heading">Search Criteria</h5></div>
      <b-form class="achievement_form" @submit.prevent="onSubmit">
        <div class="form-group mx-sm-3 mb-2 search_achievement_bar">
          <b-input
            type="text"
            class="form-control"
            id="achievement_search"
            placeholder="Search for specific achievement"
          ></b-input>
          <b-button variant="primary" type="submit" value="Search Achievements"
            >Find Achievement</b-button
          >
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
  name: "FilterAchievements",

  methods: {
    gameSelection(gameSelectionArray) {
      this.$emit("searchCriteriaRecieved", gameSelectionArray);
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
</style>