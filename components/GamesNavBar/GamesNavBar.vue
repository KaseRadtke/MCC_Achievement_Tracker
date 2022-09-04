<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
import GameLogo from "../GameLogo/GameLogo.vue";
export default {
  components:{GameLogo},
  name: "GamesNavBar",

  created() {
    this.gameBar = this.$children;
    this.$emit("gameSelected", "crossgame"); // On creation, selects crossgames data to be displayed.
  },
  data() {
    return {
      isSelected: { default: false },
    };
  },

  methods: {
    gameSelected(selectedGame) {
      this.$emit("gameSelected",selectedGame);
      this.gameBar.forEach((gameLogo) => {
          gameLogo.active = (selectedGame === gameLogo.game);
      });
    },
  },
};
</script>