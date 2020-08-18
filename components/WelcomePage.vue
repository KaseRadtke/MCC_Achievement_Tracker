<template>
  <div class="container" id="welcomeContainer">

      <Logo/>
      <h1 class="title">
        MCC Achievement Tracker
      </h1>

      <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      <button>Xbox</button>
      <button>Steam</button>
      <br>
      <SearchUser @search-user="searchUser"/>
      <p class="description"> Enter your Xbox LIVE Gamertag to pull your current achievement progress for Halo: The Master Chief Collection </p>
      <br>
      <h6 id="notFoundText" v-if="userNotFound">Xbox LIVE Gamertag not found. Are you sure you spelled it correctly?</h6>
      

  </div>
</template>

<script>

import axios from "axios";


export default {
name: 'WelcomePage',

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
    .container #welcomeContainer{
    border: rgb(230, 230, 230) solid 2px;
    border-radius: 25px;
    margin: 0 auto;
    width: 400px 400px;
    min-height: 10vh;
    justify-content: center;
    align-items: center;
    text-align: center;
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
    color: #ffffff;
    font-size: 15px;

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