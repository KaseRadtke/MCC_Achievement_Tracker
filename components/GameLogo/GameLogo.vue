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
};
</script>