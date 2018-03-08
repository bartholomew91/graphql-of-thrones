'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = GraphQL;
const db = require('../config/dbconnection').get(); // grab the db instance
const _ = require('lodash');

// import types
const CharacterType = require('./types/Character');


// define the root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'This is the default root query',
    fields: {
        characters: {
            type: new GraphQLList(CharacterType),
            description: 'Returns all characters.',
            args: {
                id: {
                    type: GraphQLID,
                    description: 'ID of a character',
                },
                name: {
                    type: GraphQLString,
                    description: 'Name of character'
                }
            },
            resolve: (parent, args, context, info) => { // ugly. lets try and refactor later
                
                let query = "SELECT * FROM characters";

                if(args.id != undefined) {
                    query = {
                        text: "SELECT * FROM characters WHERE id = $1",
                        values: [args.id],
                    };
                }
                
                if(args.name != undefined) {
                    query = {
                        text: "SELECT * FROM characters WHERE name LIKE $1",
                        values: [`%${_.startCase(args.name)}%`], // postgres is case sensitive. convert to Start Case
                    }
                }

                return db.query(query)
                    .then( response => {
                        return response.rows;
                    });
            }
        },
    },
});


// export schema
module.exports = new GraphQLSchema({
	query: RootQuery,
});