<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
export default {
  name: "SearchUser",
  mounted() {},

  data() {
    return {
      gamertag: "",
      validation: true,
      platform: "xbox",
      placeholder_text: "Enter Xbox LIVE Gamertag",
      steamSelected: false,
      xboxSelected: true,
    };
  },

  methods: {
    onSubmit() {
      this.$emit("search-user", this.gamertag);
      this.gamertag = "";
    },

    buttonSelected(selectedPlatform) {
      if (selectedPlatform == "xbox") {
        if (this.xboxSelected == false) {
          this.xboxSelected = true;
          this.steamSelected = false;
          this.placeholder_text = "Enter Xbox LIVE Gamertag";
          this.$emit("platformSelected", " Xbox LIVE gamertag");
        }
      } else if (selectedPlatform == "steam") {
        if (this.steamSelected == false) {
          this.steamSelected = true;
          this.xboxSelected = false;
          this.placeholder_text = "Enter Steam ID";
          this.$emit("platformSelected", " Steam ID");
        }
      }
    },
  },
};
</script>
    