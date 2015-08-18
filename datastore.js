var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var Q = require('q');

function getByKey(collection, key) {
    return db.get(collection, key)
    .tap(console.log)
    .fail(function (err) {
        console.error(err);
        throw err;
    });
}

function updateByKey(collection, key) {
    return db.put(collection, key)
    .tap(console.log)
    .fail(function (err) {
        console.error(err);
        throw err;
    });
}

module.exports = {
    getByKey: getByKey,
    updateByKey: updateByKey
};
