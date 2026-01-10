<template src='./template.html'></template>
<style src='./style.css'></style>

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

  methods: {
    getMobileSize(vwSize) {
      // Convert vw to reasonable mobile pixel sizes - BIGGER!
      const size = parseFloat(vwSize);
      if (size <= 3) return 44; // Small logos (crossgame, odst) - was 36
      if (size <= 4.5) return 52; // Medium logos (reach) - was 42
      if (size <= 6.2) return 58; // Large logos (halo3, halo4) - was 48
      return 64; // Extra large logos (haloce, halo2) - was 52
    },
  },
};
</script>
