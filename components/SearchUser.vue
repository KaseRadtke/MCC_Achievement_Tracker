<template>
    <div id="search_component">
         <div id="platform_selection">
            <input :class="xboxSelected ? 'selected' : 'unselected'" id='xboxButton' type="image" src="/xbox_button.png" alt="Submit" :xboxSelected='true' @click="buttonSelected('xbox')">
            <input :class="steamSelected ? 'selected' : 'unselected'" id= 'steamButoon' type="image" src="/steam_button.png" alt="Submit" :steamSelected='false' @click="buttonSelected('steam')">
        </div>
        <b-form @submit.prevent="onSubmit" class="form-inline">
            <div class="form-group mx-sm-3 mb-2" style="flex-flow: nowrap; width: 320px">
                <b-input type="text" v-model="gamertag" class="form-control" id="user_search" :placeholder='placeholder_text'></b-input>
                <b-button variant="primary" type="submit" value="Search Achievements">Search</b-button>
            </div>
        </b-form>
    </div>
  
</template>

<script>
export default {

    name: 'SearchUser',
    mounted (){
    },

    data () {
        return {
            gamertag: '',
            validation: true,
            platform:'xbox',
            placeholder_text: "Enter Xbox LIVE Gamertag",
            steamSelected: false,
            xboxSelected: true
        }
    },

    methods: {
        onSubmit() {
            this.$emit('search-user', this.gamertag);
            this.gamertag="";
        },

        buttonSelected(selectedPlatform) {
            if (selectedPlatform == 'xbox'){
                if(this.xboxSelected == false){
                    this.xboxSelected = true
                    this.steamSelected = false;
                    this.placeholder_text = "Enter Xbox LIVE Gamertag"
                    this.$emit('platformSelected', ' Xbox LIVE gamertag')
                }
            }
            else if (selectedPlatform == 'steam'){
                if(this.steamSelected == false){
                    this.steamSelected = true
                    this.xboxSelected = false;
                    this.placeholder_text = "Enter Steam ID"
                    this.$emit('platformSelected', ' Steam ID')
                }
            }
        }


    }

}
</script>

<style>
#platform_selection{
    position: relative;
    width: 200px;
    right:35px;
    margin-bottom: 5px;
}
#user_search{
    width: 80%;
    margin-right: 20px;
}

.unselected {
    opacity: 20%;
}

.selected {
    opacity: 100%
}


</style>
    