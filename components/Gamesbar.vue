<template>
  <div id="games_bar_header">
    <ul class="nav nav-tabs navbar">
      <GameLogo
        :isSelected="true"
        @selected="gameSelected('crossgame')"
        game="crossgame"
        size="3"
      />
      <GameLogo class="game_icon" @selected="gameSelected('reach')" game="reach" size="4.5" />
      <GameLogo class="game_icon" @selected="gameSelected('haloce')" game="haloce" size="6.5" />
      <GameLogo class="game_icon" @selected="gameSelected('halo2')" game="halo2" size="6.5" />
      <GameLogo class="game_icon" @selected="gameSelected('odst')" game="odst" size="2.2" />
      <GameLogo class="game_icon" @selected="gameSelected('halo3')" game="halo3" size="6.5" />
      <GameLogo class="game_icon" @selected="gameSelected('halo4')" game="halo4" size="6.2" />
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