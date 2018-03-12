'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// refactor resolver functions at a later point
const db = require('../config/dbconnection').get(); // grab the db instance
const _ = require('lodash');

const character = (character, data) => {
    if (character[data].length > 0) {
        const query = {
            text: 'SELECT * FROM characters WHERE id IN($1)',
            values: ['{' + (0, _values2.default)(character[data][0]).join(',') + '}']
        };
        return db.query(query).then(res => {
            return res.rows;
        });
    }
    return null;
};

const title = titles => {
    if (titles.length > 0) {
        const query = {
            text: 'SELECT * FROM titles WHERE id IN($1)',
            values: ['{' + (0, _values2.default)(titles[0]).join(',') + '}']
        };
        return db.query(query).then(res => {
            return res.rows;
        });
    }
    return null;
};

const allegiance = houses => {
    if (houses.length > 0) {
        const query = {
            text: 'SELECT * FROM houses WHERE id IN($1)',
            values: ['{' + (0, _values2.default)(houses[0]).join(',') + '}']
        };
        return db.query(query).then(res => {
            return res.rows;
        });
    }
    return null;
};

const religion = religions => {
    if (religions.length > 0) {
        const query = {
            text: 'SELECT * FROM religions WHERE id IN($1)',
            values: ['{' + (0, _values2.default)(religion[0]).join(',') + '}']
        };
        return db.query(query).then(res => {
            return res.rows;
        });
    }
};

module.exports = { character, title, allegiance, religion };