<template>
  <div class="criteria_selection">
    <b-form-group>
      <div class="form-check selectAll">
        <b-form-checkbox
          v-model="allSelected"
          aria-describedby="modes"
          aria-controls="modes"
          @change="toggleAllCheckboxes"
        >
          {{ allSelected ? "Un-select All" : "Select All" }}
        </b-form-checkbox>
      </div>
      <div id="modes_div">
        <h5 class="modes_heading">Filter by Mode</h5>
        <div class="modes">
          <b-form-checkbox-group
            v-model="selected"
            :options="modes"
            plain
            stacked
          ></b-form-checkbox-group>
        </div>
      </div>
      <h5 class="maps_heading" v-show="campaignSelected || multiplayerSelected">
        Filter by Map
      </h5>
      <div id="maps_div">
        <div class="campaign_maps" v-show="campaignSelected">
          <div>
            <b-form-checkbox-group
              v-model="selected"
              :options="campaign_maps"
              plain
              stacked
            ></b-form-checkbox-group>
          </div>
        </div>
        <div class="multiplayer_maps" v-show="multiplayerSelected">
          <b-form-checkbox-group
            v-model="selected"
            :options="multiplayer_maps"
            plain
            stacked
          ></b-form-checkbox-group>
        </div>
        <div id="maps_div">
          <div class="spartan_ops_maps" v-show="spartanOpsSelected">
            <div>
              <b-form-checkbox-group
                v-model="selected"
                :options="spartan_ops_maps"
                plain
                stacked
              ></b-form-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "GameSearchSettings",

  props: {
    currentGame: String,
    gameData: Object,
  },

  methods: {
    toggleAllCheckboxes(checked) {
      var checkboxArray = [];
      for (var i = 0; i < this.modes.length; i++) {
        checkboxArray.push(this.modes[i].value);
      }
      for (var i = 0; i < this.campaign_maps.length; i++) {
        checkboxArray.push(this.campaign_maps[i].value);
      }
      for (var i = 0; i < this.multiplayer_maps.length; i++) {
        checkboxArray.push(this.multiplayer_maps[i].value);
      }

      // Check for Spartan ops as only Halo 4 has it.
      if (this.currentGame == "halo4") {
        for (var i = 0; i < this.spartan_ops_maps.length; i++) {
          checkboxArray.push(this.spartan_ops_maps[i].value);
        }
      }
      this.selected = checked ? checkboxArray.slice() : [];
    },

    removeMapsInSelectedArray(mode) {
      switch (mode) {
        case "campaign":
          this.campaignSelected = false;
          for (var i = 0; i < this.campaign_maps.length; i++) {
            var index = this.selected.indexOf(this.campaign_maps[i].value);
            if (index > -1) {
              this.selected.splice(index, 1);
            }
          }
          break;
        case "multiplayer":
          this.multiplayerSelected = false;
          for (var i = 0; i < this.multiplayer_maps.length; i++) {
            var index = this.selected.indexOf(this.multiplayer_maps[i].value);
            if (index > -1) {
              this.selected.splice(index, 1);
            }
          }
          break;

        case "spartan_ops":
          this.spartanOpsSelected = false;
          for (var i = 0; i < this.spartan_ops_maps.length; i++) {
            var index = this.selected.indexOf(this.spartan_ops_maps[i].value);
            if (index > -1) {
              this.selected.splice(index, 1);
            }
          }
          break;
      }
    },
  },

  watch: {
    selected(newVal, oldVal) {
      // Checks if all boxes have been selected
      if (newVal.length === 0) {
        this.allSelected = false;
      }

      //Since Halo 4 and Reach have modes other games don't have, have to add in special checks for these games
      switch (this.currentGame) {
        case "halo4":
          if (
            newVal.length ===
            this.modes.length +
              this.campaign_maps.length +
              this.multiplayer_maps.length +
              this.spartan_ops_maps.length
          ) {
            this.allSelected = true;
          } else {
            this.allSelected = false;
          }

          if (this.selected.includes("spartan_ops")) {
            this.spartanOpsSelected = true;
          } else {
            this.removeMapsInSelectedArray("spartan_ops");
          }

          break;

        default:
          if (
            newVal.length ===
            this.modes.length +
              this.campaign_maps.length +
              this.multiplayer_maps.length
          ) {
            this.allSelected = true;
          } else {
            this.allSelected = false;
          }
      }

      // Checks for every mode filter. Removes div from display if they arent selected, and removes all items from the selected array.
      if (
        this.selected.includes("campaign") ||
        this.selected.includes("coop")
      ) {
        this.campaignSelected = true;
      } else {
        this.removeMapsInSelectedArray("campaign");
      }

      if (this.selected.includes("multiplayer")) {
        this.multiplayerSelected = true;
      } else {
        this.removeMapsInSelectedArray("multiplayer");
      }

      this.$emit("gameSelection", this.selected);
    },

    gameData() {
      this.selected = this.gameData.selected;
      this.allSelected = this.gameData.allSelected;
      this.campaignSelected = this.gameData.campaignSelected;
      this.multiplayerSelected = this.gameData.multiplayerSelected;
      this.spartanOpsSelected = this.gameData.spartanOpsSelected;
      this.modes = this.gameData.modes;
      this.campaign_maps = this.gameData.campaign_maps;
      this.multiplayer_maps = this.gameData.multiplayer_maps;
      this.spartan_ops_maps = this.gameData.spartan_ops_maps;

      this.$emit("gameSelection", this.selected);
    },
  },

  data() {
    return {
      selected: this.gameData.selected,
      allSelected: this.gameData.allSelected,
      campaignSelected: this.gameData.campaignSelected,
      multiplayerSelected: this.gameData.multiplayerSelected,
      spartanOpsSelected: this.gameData.spartanOpsSelected,
      modes: this.gameData.modes,
      campaign_maps: this.gameData.campaign_maps,
      multiplayer_maps: this.gameData.multiplayer_maps,
      spartan_ops_maps: this.gameData.spartan_ops_maps,
    };
  },
};
</script>

<style>
.selectAll {
  padding-bottom: 5px;
  display: contents;
}

.form-check {
  padding-left: 0em;
}

.criteria_selection {
  padding-left: 2em;
}
.selection_heading {
  color: #ffffff;
  font-size: 17px;
}

.modes {
  padding-left: 3em;
}

#modes_div {
  padding-bottom: 1em;
}

#maps_div {
  padding-left: 3em;
}
.campaign_maps {
  float: left;
  width: 12em;
  padding-right: 3em;
}

.multiplayer_maps {
  display: grid;
}

.spartan_ops_maps {
  display: grid;
}

.modes_heading,
.maps_heading {
  color: white;
  font-size: 17px;
}
</style>