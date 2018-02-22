const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const fetch = require('node-fetch')
const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
} = require('graphql')
const https = require('https')

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    description: 'Character information',
    fields: () => ({
        _id: {
            type: GraphQLString,
            resolve: json =>
                json._id
        },
        name: {
            type: GraphQLString,
            resolve: json =>
                json.name
        },
        titles: {
            type: GraphQLString,
        },
        male: {
            type: GraphQLBoolean,
            resolve: json =>
                json.male
        },
        culture: {
            type: GraphQLString,
            resolve: json =>
                json.culture || "Unknown"
        },
        age: {
            type: GraphQLInt,
            resolve: json =>
                json.age || undefined
        },
        dateOfBirth: {
            type: GraphQLInt,
            resolve: json =>
                json.dateOfBirth || undefined
        },
        dateOfDeath: {
            type: GraphQLInt,
            resolve: json =>
                json.dateOfDeath || undefined
        },
        actor: {
            type: GraphQLString,
            resolve: json =>
                json.actor || undefined
        },
        house: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLString,
        },
        pageRank: {
            type: GraphQLFloat,
        },
        books: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString,
        },
        createdAt: {
            type: GraphQLString,
        },
    })
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'GraphQL of Thrones',
        fields: () => ({
            characters: {
                type: new GraphQLList(CharacterType),
                resolve: (root, args) => {
                    return fetch(
                        `https://api.got.show/api/characters/`,
                        // SSL cert is expired...turn off rejection
                        {
                            agent: new https.Agent({
                                rejectUnauthorized: false
                            })
                        }
                    )
                    .then(response => response.json())
                }
            },
            character: {
                type: CharacterType,
                args: {
                    _id: { type: GraphQLString },
                    name: { type: GraphQLString }
                },
                resolve: (root, args) => {
                    let query = ''

                    if(args._id !== undefined) {
                        query = `byId/${args._id}`
                    } else {
                        query = (args.name !== undefined) ? encodeURIComponent(args.name) : ''
                    }

                    return fetch(
                        `https://api.got.show/api/characters/${query}`,
                        // SSL cert is expired...turn off rejection
                        {
                            agent: new https.Agent({
                                rejectUnauthorized: false
                            })
                        }
                    )
                    .then(response => response.json())
                    .then( json => json.data )
                }
            }
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8080)
console.log('Listening on port 8080...')