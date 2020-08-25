<template>
    <div id="search_component">
         <div id="platform_selection">
            <input type="image" src="/xbox_button.png" alt="Submit">
            <input type="image" src="/steam_button.png" alt="Submit">
        </div>
        <b-form @submit.prevent="onSubmit" class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
                <b-input type="text" v-model="gamertag" class="form-control" id="user_search" placeholder='Enter Xbox LIVE Gamertag'></b-input>
                <b-button variant="primary" type="submit" value="Search Achievements">Search</b-button>
                <nuxt-link :to="`xbox/${gamertag}`">Test</nuxt-link>
            </div>
        </b-form>
    </div>
  
</template>

<script>
export default {

    name: 'Search-User',

    data () {
        return {
            gamertag: '',
            validation: true
        }

    },

    methods: {

        onSubmit() {
            this.$emit('search-user', this.text);
            this.text="";
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
    width: 70%;
    margin-right: 20px;
}
</style>
    