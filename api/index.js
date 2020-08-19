const express = require('express')
const db = require('./db')
const cors = require("cors");


// Create express instnace
const app = express()

app.use(cors({ origin: 'https://boequestrian.herokuapp.com/' })); 

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Require & Import API routes
const users = require('./routes/users')

// Use API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
