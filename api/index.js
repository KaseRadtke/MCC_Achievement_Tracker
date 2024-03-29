require('dotenv').config()


import express from 'express'
import axios from "axios";

const cors     = require('cors')
const app      = express()
const config = {
    headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type' : 'application/json',
        'Accept-Language': 'en-US'
    }
}

 app.get('/:gamertag', cors(), async (req, res) => {

    const userXboxAchievements = await getUserXboxAchievements();
    return res.send(userXboxAchievements);


    async function getUserXboxAchievements() {
        console.log(req.params.gamertag)
        // Gets users needed XUID from XAPI using axio's request.
        const userXUID = await axios.get(`https://xapi.us/api/${req.params.gamertag}/profile-for-gamertag`, config, {timeout: 5000})
                            .then(response => {
                            return response.data['id'];
                            })
                            .catch(error => {
                                console.log(`error: ${error}`);
                                return false;
                            });

        // If XUID is valid, then get JSON of users Halo: The Master Chief Collection achievements using their XUID.
        if(userXUID) {
            const xboxAchievementsFiltered = await axios.get(`https://xapi.us/api/${userXUID}/achievements/1144039928`, config, {timeout: 5000})
                .then(function (response) {
                    const achievementsJSON = response.data['achievements']
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

 module.exports = {
   path: '/api/data/xbox',
   handler: app
 }