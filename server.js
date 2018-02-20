const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const fetch = require('node-fetch')


app.listen(8080)
console.log('Listening on port 8080...')