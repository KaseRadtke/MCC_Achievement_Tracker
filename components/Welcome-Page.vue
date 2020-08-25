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
        <SearchUser @search-user="searchUser"/>
        <h6 id="notFoundText" v-if="userNotFound">Xbox LIVE Gamertag not found. Are you sure you spelled it correctly?</h6>
    </div>
      <p class="instructions"> Enter your Xbox LIVE Gamertag to pull your current achievement progress for Halo: The Master Chief Collection </p>
  </div>
</template>

<script>

import axios from "axios";


export default {
name: 'Welcome-Page',

data() {
    return {
        usersCompletedAchievements : [],
        userNotFound : false,
    }
},

methods: {
        async searchUser(userGamerID) {
            try {
                const res = await axios.get(`/api/xbox/${userGamerID}`);
                console.log(res.data)
                if (res.data == false){
                    this.userNotFound = true;
                } 
                else {
                    this.usersCompletedAchievements = JSON.stringify(res.data);
                    console.log(`${userGamerID}'s achievement data is: ${this.usersCompletedAchievements}`);
                }
            } 
            catch (err) {
                console.log("error!: " + err);
            }
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
        width: 50%;
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

    }
    .container #welcomeContainer{
        border: rgb(230, 230, 230) solid 3px;
        border-radius: 25px;
        margin: 0 auto;
        width: 1200px;
        display: block;
        overflow: auto;
        min-width: 10vh;
        padding: 50px;
        justify-content: center;
        align-items: center;
        text-align: center;    
        background-color:rgba(0,0, 0, 0.7);
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

    }

</style>