<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
import GameSearchFilters from "../GameSearchFilters/GameSearchFilters.vue";

export default {
  name: "SearchForAchievement",

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
    GameSearchFilters,
  },

  props: {
    currentGame: String,
  },
};
</script>