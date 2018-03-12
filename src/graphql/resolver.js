// refactor resolver functions at a later point
const db = require('../config/dbconnection').get() // grab the db instance
const _ = require('lodash')

const character = (character, data) => {
    if(character[data].length > 0) {
        const query = {
            text: 'SELECT * FROM characters WHERE id IN($1)',
            values: ['{' + Object.values(character[data][0]).join(',') + '}']
        }
        return db.query(query).then( res => { return res.rows })
    }
    return null
};

const title = titles => {
    if(titles.length > 0) {
        const query = {
            text: 'SELECT * FROM titles WHERE id IN($1)',
            values: ['{' + Object.values(titles[0]).join(',') + '}']
        }
        return db.query(query).then( res => { return res.rows })
    }
    return null
}

const allegiance = houses => {
    if(houses.length > 0) {
        const query = {
            text: 'SELECT * FROM houses WHERE id IN($1)',
            values: ['{' + Object.values(houses[0]).join(',') + '}']
        }
        return db.query(query).then( res => { return res.rows })
    }
    return null
}

const religion = religions => {
    if(religions.length > 0) {
        const query = {
            text: 'SELECT * FROM religions WHERE id IN($1)',
            values: ['{' + Object.values(religion[0]).join(',') + '}']
        }
        return db.query(query).then( res => { return res.rows })
    }
}

module.exports = { character, title, allegiance, religion }