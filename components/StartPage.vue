<template>
  <div class="container" id="welcomeContainer">
      <Logo/>
      <h1 class="title">
        MCC Achievement Tracker
      </h1>
    <div id="bio">
        <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
    </div>
    <div id="search_content">
        <SearchUser @search-user="searchUser" @platformSelected="changePlatformText"/>
    </div>
    <h6 id="notFoundText" v-if="userNotFound">Xbox LIVE Gamertag not found. Are you sure you spelled it correctly?</h6>
      <p class="instructions"> Enter your {{ platform_id }} to pull your current achievement progress for Halo: The Master Chief Collection </p>
  </div>
</template>

<script>

import axios from "axios";
import SearchUser from "../components/SearchUser"
export default {
    name: 'StartPage',

    components: {
        SearchUser
    },

    props: {
        wasRedirected : {default: false}
    },

    data() {
        return {
            userNotFound : false,
            platform_id: "Xbox LIVE Gamertag"
        }
    },

    methods: {
            async searchUser(userGamerID) {
                this.$nuxt.$loading.start()
                try {
                    const res = await axios.get(`/api/data/xbox/${userGamerID}`);
                    if (res.data == false) {
                        this.$nuxt.$loading.finish()
                        this.userNotFound = true;
                    } 
                    else {
                        console.log(res.data)
                        this.$router.push(`/api/xbox/${userGamerID}`);
                    }
                } 
                catch (err) {
                    console.log("error!: " + err);
                }
            },

            changePlatformText(selectedPlatform){
                this.platform_id = selectedPlatform
                this.userNotFound = false;
            }
        },
    }
</script>

<style>

    #notFoundText {
        color: rgb(252, 65, 65);
    }
    
    #bio{
        width: 70%;
        line-height: 2.0;
        padding-top: 10px;
        padding-bottom: 2%;
        margin: 0 auto;
        text-align: left; 
    }

    #search_content{
        display: table;
        margin: 0 auto;
    }

    .instructions{
        width: 55%;
        padding-top: 15px;
        color: #c4c4c4;
        margin: auto; 
    }

     .description {
        font-family:
            'Quicksand',
            'Source Sans Pro',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            sans-serif;
        color: #c4c4c4;
        font-size: 20px;
        margin-left: 20px
    }
    .container #welcomeContainer{
        border: rgb(230, 230, 230) solid 2px;
        border-radius: 25px;
        margin-top: 5%;
        width: 1200px;
        display: block;
        overflow: auto;
        min-width: 10vh;
        padding: 70px;
        justify-content: center;
        align-items: center;
        text-align: center;    
        background-color:rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        position: absolute;
        z-index: 100;
    } 
    .title {
        font-family:
            'Quicksand',
            'Source Sans Pro',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            sans-serif;
        display: block;
        font-weight: 300;
        font-size: 50px;
        color: #ffffff;
        letter-spacing: 1px;
padding-bottom: 10px;
    }

</style>