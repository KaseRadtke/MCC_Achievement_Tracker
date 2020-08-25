require('dotenv').config()


import express from 'express'
import axios from "axios";

const cors     = require('cors')
const app      = express()
const config = {
    headers: {
        'X-AUTH': process.env.API_KEY,
        'Content-Type' : 'application/json'
    }
}

 app.all('/:gamertag', cors(), async (req, res) => {

    const userXboxAchievements = await getUser();
    return res.send(userXboxAchievements);


    async function getUser() {

        // Gets users needed XUID from XAPI using axio's request.
        const userXUID = await axios.get(`https://xapi.us/v2/xuid/${req.params.gamertag}`, config, {timeout: 5000})
                            .then(response => {
                            //console.log(`${req.params.gamertag}'s xuid retrieved: ${response.data['xuid']}`);
                            return response.data['xuid'];
                            })
                            .catch(error => {
                                console.log(`error: ${error}`);
                                return false;
                            });
        if(userXUID) {
            return true;
        } else {
            return false;
        }
    }
    
 })

 module.exports = {
   path: '/xbox',
   handler: app
 }