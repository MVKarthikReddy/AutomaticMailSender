const express = require('express')
const { google } = require('googleapis')
const sendMail = require('./components/MailSender')
require('dotenv').config()

const app = express()

// details for creating oauth2 client 
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

// refresh token for oauth2 client
oAuth2Client.setCredentials(
    {
        refresh_token: process.env.REFRESH_TOKEN
    }
)


const a = () => {
    // calling our function in a random interval of time (in between 45-120 sec)
    setInterval(sendMail,Math.floor(45 + Math.random()*(120 - 45 + 1))*1000,oAuth2Client)
    // Instead of setInterval() we can also use nodecron for calling a method in scheduled interval of time
}

a()

port = process.env.PORT || 5001

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})