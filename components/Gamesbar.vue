<template>
  <div id="games_bar_header">
    <ul class="nav nav-tabs navbar">
      <GameLogo
        :isSelected="true"
        @selected="gameSelected('crossgame')"
        game="crossgame"
        size="80px"
      />
      <GameLogo @selected="gameSelected('reach')" game="reach" size="100px" />
      <GameLogo @selected="gameSelected('haloce')" game="haloce" size="160px" />
      <GameLogo @selected="gameSelected('halo2')" game="halo2" size="160px" />
      <GameLogo @selected="gameSelected('odst')" game="odst" size="55px" />
      <GameLogo @selected="gameSelected('halo3')" game="halo3" size="160px" />
      <GameLogo @selected="gameSelected('halo4')" game="halo4" size="160px" />
    </ul>
  </div>
</template>

<script>
export default {
  name: "Gamesbar",

  created() {
    this.gameBar = this.$children;
    this.$emit("gameSelected", "crossgame"); // On Creation, selects crossgames data to be displayed.
  },
  data() {
    return {
      isSelected: { default: false },
    };
  },

  mounted() {
    // Once mounted, selected Reach as default.
  },

  methods: {
    gameSelected(game) {
      this.$emit("gameSelected", game);
      this.gameBar.forEach((gameLogo) => {
        if (game == gameLogo.game) {
          gameLogo.active = true;
        } else {
          gameLogo.active = false;
        }
      });
    },
  },
};
</script>

<style>
</style>