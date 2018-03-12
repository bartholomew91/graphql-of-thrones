// our main app
'use strict'

const db = require('./config/dbconnection')
db.connect()

const express = require('express')
const expressGraphQL = require('express-graphql')
const app = express()
const schema = require('./graphql/schema') // import our schema
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const endpoint = () => { return { schema } }
const graphiql = () => {
    return {
        graphiql: true,
        schema
    }
}

app.use(awsServerlessExpressMiddleware.eventContext())
app.use('/v1', expressGraphQL(endpoint))
app.use('/graphiql', expressGraphQL(graphiql))

module.exports = app