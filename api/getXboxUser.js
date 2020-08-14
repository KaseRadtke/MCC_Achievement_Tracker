require('dotenv').config()

const express       = require('express')
const cors          = require('cors')
const app = express()

// from your component, you'll be able to do something like this.$axios.get('/api/nowise10/your-endpoint')
app.get('/', cors(), async (req, res) => {
    // here is where you can use process.env.YOUR_API_KEY
    const result = 'Hello World';
    res.send({ message: "We did it!" });
    console.log(result);
})

// -- export app --
module.exports = {
    path    : 'https://xapi.us/v2/xuid',
    handler : app
}