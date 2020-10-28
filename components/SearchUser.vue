<template>
  <div class="search_component">
    <div class="platform_selection">
      <input
        :class="xboxSelected ? 'platform_selected' : 'platform_unselected'"
        id="xboxButton"
        type="image"
        :src="require(`../static/icons/xbox_button.png`)"
        alt="Submit"
        :xboxSelected="true"
        @click="buttonSelected('xbox')"
      />
      <input
        :class="steamSelected ? 'platform_selected' : 'platform_unselected tooltip-target-1'"
        v-b-tooltip.hover
        title="Steam API coming soon™"
        id="steamButton"
        type="image"
        :src="require(`../static/icons/steam_button.png`)"
        alt="Submit"
        :steamSelected="false"
      />
    </div>
    <b-form @submit.prevent="onSubmit" class="form-inline">
      <div
        class="form-group mx-sm-3 mb-2 searchform"
        id="searchDiv"
      >
        <b-input
          type="text"
          v-model="gamertag"
          class="form-control user_search"
          :placeholder="placeholder_text"
        ></b-input>
        <b-button variant="primary" type="submit" value="Search Achievements"
          >Search</b-button
        >
      </div>
    </b-form>
  </div>
</template>

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

<style scoped>
.platform_selection {
  position: relative;
  width: 200px;
  right: 35px;
  margin-bottom: 5px;
}
.user_search {
  width: 80%;
  margin-right: 20px;
}

.platform_unselected {
  opacity: 0.2;
}

.platform_selected {
  opacity: 1
}
#searchDiv{
    flex-flow: nowrap;
    width: 320px;
  }

@media screen and (max-width: 960px) {
  #searchDiv{
    flex-flow: column;
  }
  .search_component {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .search_component > * {
    padding-bottom: 12px;
  }
  .platform_selection {
   right: 100px;
  }
  .search_component .form-inline {
    flex-flow: column;
  }
  .search_component .form-inline .form-group {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: stretch;
  }
  .user_search {
    margin-right: 0;
    margin-bottom: 12px;
    width: 100%;
  }
  .instructions {
    width: unset;
    font-size: 14px;
    margin-bottom: 12px;
  }
}
</style>
    