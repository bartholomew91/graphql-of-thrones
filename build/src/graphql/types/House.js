'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = GraphQL;

const TitleType = require('./Title');

const HouseType = new GraphQL.GraphQLObjectType({
    name: 'House',
    description: 'Houses of Westeros.',

    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID of the House'
        },
        name: {
            type: GraphQLString,
            description: 'Name of the House'
        },
        description: {
            type: GraphQLString,
            description: 'Description of the House'
        },
        sigil: {
            type: GraphQLString,
            description: 'Sigil beloning to the House'
        },
        motto: {
            type: GraphQLString,
            description: 'The Houses motto'
        }
    })
});

module.exports = HouseType;