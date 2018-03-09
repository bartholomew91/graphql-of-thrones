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
const jsonUtils = require('../../utils/json');

const TitleType = require('./Title');
const HouseType = require('./House');

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
            resolve: character => { // refactor needed
                if(character.titles != '') {
                    const query = {
                        text: 'SELECT * FROM titles WHERE id IN($1)',
                        values: [jsonUtils.toCommaDelim(character.titles, val => val.id)]
                    }
                    return db.query(query)
                        .then( (response) => {
                            return response.rows;
                        });
                }
                return null;
            }
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
            resolve: character => {
                if(character.allegiance.length > 0) {
                    const query = {
                        text: 'SELECT * FROM houses WHERE id IN($1)',
                        values: [jsonUtils.toCommaDelim(character.allegiance, val => val.id)]
                    }
                    return db.query(query)
                        .then( response => {
                            return response.rows;
                        })
                }
                return null;
            }
        },
        successor: {
            type: new GraphQLList(CharacterType),
            description: 'The characters successor',
            resolve: character => {
                if(character.successor.length > 0) {
                    const query = {
                        text: 'SELECT * FROM characters WHERE id IN($1)',
                        values: [jsonUtils.toCommaDelim(character.successor, val => val.id)]
                    }
                    return db.query(query)
                        .then( response => {
                            return response.rows;
                        });
                }
                return null;
            }
        },
        spouse: {
            type: new GraphQLList(CharacterType),
            description: 'Spouse(s) for the character',
            resolve: character => { // refactor needed
                if(character.spouse != null && character.spouse.length > 0) {
                    const query = {
                        text: 'SELECT * FROM characters WHERE id IN($1)',
                        values: [jsonUtils.toCommaDelim(character.spouse, val => val.id)]
                    }
                    return db.query(query)
                        .then( response => {
                            return response.rows;
                        });
                }
                return null;
            }
        },
        father: {
            type: new GraphQLList(CharacterType),
            description: 'Father of the character',
            resolve: character => { // refactor needed
                if(character.father.length > 0) {
                    const query = {
                        text: 'SELECT * FROM characters WHERE id IN($1)',
                        values: [jsonUtils.toCommaDelim(character.father, val => val.id)]
                    }
                    return db.query(query)
                        .then( response => {
                            return response.rows;
                        });
                }
                return null;
            }
        },
    })
});


module.exports = CharacterType;