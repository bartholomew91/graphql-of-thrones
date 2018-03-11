'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean
} = GraphQL;
const db = require('../../config/dbconnection').get(); // grab the db instance

const TitleType = require('./Title');
const HouseType = require('./House');
const resolvers = require('../resolver');

const CharacterType = new GraphQL.GraphQLObjectType({
    name: 'Character',
    description: 'Character Type for all GoT characters.',

    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID of the character',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the character',
        },
        description: {
            type: GraphQLString,
            description: 'Description of the character',
        },
        titles: {
            type: new GraphQLList(TitleType),
            description: 'Titles held by characters',
            resolve: char => resolvers.title(char.titles)
        },
        alive: {
            type: GraphQLBoolean,
            description: 'Denotes if a character is alive or not',
        },
        death: {
            type: GraphQLString,
            description: 'Provides information about the characters death'
        },
        allegiance: {
            type: new GraphQLList(HouseType),
            description: 'House(s) the character belongs to',
            resolve: char => resolvers.allegiance(char.allegiance)
        },
        successor: {
            type: new GraphQLList(CharacterType),
            description: 'The characters successor',
            resolve: char => resolvers.character(char, "successor")
        },
        spouse: {
            type: new GraphQLList(CharacterType),
            description: 'Spouse(s) for the character',
            resolve: char => resolvers.character(char, "spouse")
        },
        father: {
            type: new GraphQLList(CharacterType),
            description: 'Father of the character',
            resolve: char => resolvers.character(char, "father")
        },
    })
});


module.exports = CharacterType;