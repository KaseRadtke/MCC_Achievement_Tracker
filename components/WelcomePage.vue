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

  </div>
</template>

<script>

import axios from "axios";


export default {
name: 'WelcomePage',


methods: {

        async searchUser(userGamerID) {

            const config = {
                headers: {
                    'X-AUTH': '83c11e736651a79389a76caf80c71056aad847ea',
                    'Content-Type' : 'application/json'
                }
            }

            try {
            //const res = await axios.get(`https://xapi.us/v2/xuid/${userGamerID}`, config);
            const res = await axios.get(`http://localhost:3000/`, config);
            console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    },

}



</script>

<style>

.container #welcomeContainer{
  border: black solid;
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