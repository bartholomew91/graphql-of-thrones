// refactor resolver functions at a later point
const db = require('../config/dbconnection').get(); // grab the db instance
const _ = require('lodash');

const character = (character, data) => {
    if(character[data].length > 0) {
        const query = {
            text: `SELECT * FROM characters WHERE id IN('${_.map(character[data], 'id').join('","')}')`, // still ugly :\
        }
        return db.query(query).then( res => { return res.rows });
    }
    return null;
};

const title = titles => {
    if(titles.length > 0) {
        const query = {
            text: `SELECT * FROM titles WHERE id IN('${_.map(titles, 'id').join("','")}')`, // still ugly :\
        }
        return db.query(query).then( res => { return res.rows });
    }
    return null;
}

const allegiance = houses => {
    if(houses.length > 0) {
        const query = {
            text: `SELECT * FROM houses WHERE id IN('${_.map(houses, 'id').join("','")}')`, // still ugly :\
        }
        return db.query(query).then( res => { return res.rows })
    }
    return null;
}

module.exports = { character };