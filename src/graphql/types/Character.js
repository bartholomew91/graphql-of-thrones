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
                    const query = `SELECT * FROM titles WHERE id IN ('${jsonUtils.toCommaDelim(character.titles, val => val.id)}')`;
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
        spouse: {
            type: new GraphQLList(CharacterType),
            description: 'Spouse(s) for the character',
            resolve: character => { // refactor needed
                if(character.spouse != null && character.spouse.length > 0) {
                    const query = `SELECT * FROM characters WHERE id IN ('${jsonUtils.toCommaDelim(character.spouse, val => val.id)}')`;
                    return db.query(query)
                        .then( (response) => {
                            return response.rows;
                        });
                }
                return null;
            }
        }
	})
});


module.exports = CharacterType;