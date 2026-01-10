<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
import GameSearchFilters from "../GameSearchFilters/GameSearchFilters.vue";

export default {
  name: "SearchForAchievement",

  components: {
    GameSearchFilters,
  },

  props: {
    currentGame: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      achievementNotFound: false,
      achievementName: "",
    };
  },

  computed: {
    isFilledOut() {
      return this.achievementName.trim().length > 0;
    },
  },

  methods: {
    gameSelection(gameSelectionArray) {
      this.$emit("searchCriteriaRecieved", gameSelectionArray);
    },

    onSubmit() {
      const trimmedName = this.achievementName.trim();
      if (trimmedName) {
        this.$emit("achievementSearched", trimmedName);
      }
    },
  },
};
</script>
