'use strict'

// little utility library for json functions

// take a flat json object and convert it to a
// comma delimited string. Passing in your function
// allows control over what json value gets joined
module.exports.toCommaDelim = (json, fn) => {
    return json.map(arg => fn(arg)).join("','");
}