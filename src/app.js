// our main app
'use strict';

// setup the db connection
const db = require('./config/dbconnection');
db.connect();

const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();

// import our schema
const GraphQLSchema = require('./graphql/schema');

// middleware to grab API Gateway events
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
app.use(awsServerlessExpressMiddleware.eventContext())

// routing for our graphQL Interface
app.use(
	'/',
	expressGraphQL( (req) => {
		return {
            graphiql: (req.apiGateway.event.queryStringParameters != null // ugly. Checks the query string and sets if we are using the query builder interface
                        && req.apiGateway.event.queryStringParameters.graphiql != null),
			schema: GraphQLSchema,
		}
	})
);

module.exports = app;