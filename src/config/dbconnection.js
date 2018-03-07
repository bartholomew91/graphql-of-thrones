'use strict'

// setup for our Postgres database
// config vars set in lambda dashboard
const { Client } = require('pg');
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

let _db;

// the connection function
const connect = () => {
    try {
        client.connect();
        _db = client
    } catch(e) {
        throw e
    }
}

// return the db instance
const get = () => _db

// disconnect from the db
const disconnect = () => _db.end()

module.exports = { connect, get, disconnect }