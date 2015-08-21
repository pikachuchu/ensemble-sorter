var http = require('q-io/http');
var Q = require('q');

function World(callback) {
    var baseUrl = 'http://104.131.75.200:3000';
    this.get = function (path, payload) {
        var body = payload ? [payload] : null;
        return http.request({
            url: baseUrl + path,
            method: 'GET',
            body: body
        })
        .then(function (response) {
            return Q.all([Q(response.status), response.body.read()]);
        }).spread(function (status, body) {
            return {
                statusCode: status,
                body: body.toString()
            };
        });
    };
    callback();
}

module.exports.World = World;
