<template>
  <div :class="active ? 'game_selected' : 'game_unselected'">
    <li class="nav-item logoselection">
      <img
      class="logo_image"
        :src="require(`../static/game_symbols/${game}_symbol.png`)"
        :style="'width:'+ (size+'vw')"
        @click="$emit('selected', game)"
      />
    </li>
  </div>
</template>

<script>
export default {
  name: "GameLogo",

  props: {
    game: String,
    size: String,
    isSelected: Boolean,
  },

  data() {
    return {
      active: this.isSelected,
    };
  },
};
</script>

<style scoped>
.game_selected {
  opacity: 1;
}
.game_unselected {
  opacity: 0.25
}
.logoselection {
  cursor: pointer;
}
</style>