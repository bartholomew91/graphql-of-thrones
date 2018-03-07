'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = GraphQL;


const TitleType = new GraphQL.GraphQLObjectType({
	name: 'Title',
	description: 'Title Type for character.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the title',
		},
		name: {
			type: GraphQLString,
			description: 'Name of the title',
		},
		description: {
			type: GraphQLString,
			description: 'Description of the title',
		},
        history: {
            type: GraphQLString,
            description: 'The history of the title',
        }
	})
});


module.exports = TitleType;