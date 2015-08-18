var db = require('orchestrate')(process.env.ORCHESTRATE_KEY);
var Q = require('q');

/**
 * @method getByKey               Gets a field by its key.
 * @param   {string}  collection  Name of collection in datastore.
 * @param   {string}  key         Key of desired field.
 * @returns {Promise}
 */
function getByKey(collection, key) {
    return db.get(collection, key)
    .tap(console.log)
    .fail(function (err) {
        console.error(err);
        throw err;
    });
}

/**
 * @method updateByKey            Updates a field by its key.
 * @param   {string}  collection  Name of collection in datastore.
 * @param   {string}  key         Key of desired field.
 * @returns {Promise}
 */
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
