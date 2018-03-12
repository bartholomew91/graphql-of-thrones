'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = GraphQL;

const CharacterType = require('./Character');
const resolvers = require('../resolver');

const ReligionType = new GraphQL.GraphQLObjectType({
    name: 'Religion',
    description: 'Religion Type for character.',

    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID of the religions'
        },
        name: {
            type: GraphQLString,
            description: 'Name of the religion'
        },
        description: {
            type: GraphQLString,
            description: 'Description of the religion'
        },
        history: {
            type: GraphQLString,
            description: 'The history of the religion'
        },
        leader: {
            type: new GraphQLList(CharacterType),
            resolve: religion => resolvers.character(religion.leader)
        }
    })
});

module.exports = TitleType;