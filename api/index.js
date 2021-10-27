require('dotenv').config()


import express from 'express'
import axios from "axios";

const cors     = require('cors')
const app      = express()
const xboxConfig = {
    headers: {
        'X-AUTH': process.env.API_KEY,
        'Content-Type' : 'application/json',
        'Accept-Language': 'en-US'
    }
}
const steamConfig = {
    headers: {
        'Content-Type' : 'application/json',
        'Accept-Language': 'en-US'
    }
}

app.get('/xbox/:gamertag', cors(), async (req, res) => {
    const userXboxAchievements = await getUserXboxAchievements();
    return res.send(userXboxAchievements);

    async function getUserXboxAchievements() {

        // Gets users needed XUID from XAPI using axio's request.
        const userXUID = await axios.get(`https://xapi.us/v2/xuid/${req.params.gamertag}`, xboxConfig, {timeout: 5000})
                            .then(response => {
                                return response.data['xuid'];
                            })
                            .catch(error => {
                                console.log(`error: ${error}`);
                                return false;
                            });

        // If XUID is valid, then get JSON of users Halo: The Master Chief Collection achievements using their XUID.
        if(userXUID) {
            const xboxAchievementsFiltered = await axios.get(`https://xapi.us/v2/${userXUID}/achievements/1144039928`, xboxConfig, {timeout: 5000})
                .then(function (response) {
                    const achievementsJSON = response.data
                    return achievementsJSON;
                })
                .catch(function (error) {
                console.log("error! : " + error);
                });
            return xboxAchievementsFiltered;
        // If XUID is invalid (i.e. gamertag doesnt exist), return false
        } else {
            return false;
        }
    }
})

app.get('/steam/:steamid', cors(), async (req, res) => {
    const userSteamAchievements = await getUserSteamAchievements();
    return res.send(userSteamAchievements);

    async function getUserSteamAchievements() {
      // Gets user's needed steamID64 if user entered a vanity identifier
      var steam64 = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${req.params.steamid}`, steamConfig, {timeout: 5000})
        .then(response => {
          return response.data.response.steamid;
        })
        .catch(error => {
          console.log(`error: ${error}`);
          return false;
        });

      // check if steamID64 lookup failed, user may have entered steam64ID already
      if (!steam64) steam64 = req.params.steamid;
      const steamAchievementsList = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=976730&key=${process.env.STEAM_API_KEY}&steamid=${steam64}`, steamConfig, {timeout: 5000})
        .then(response => {
            const achievementsJSON = response.data.playerstats.achievements;
            return achievementsJSON;
        })
        .catch(error => {
            console.log(`error: ${error}`);
            return false;
        })

      return steamAchievementsList;
    }
})

module.exports = {
  path: '/api/data',
  handler: app
}
