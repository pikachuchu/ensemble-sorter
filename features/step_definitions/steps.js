module.exports = function () {
    this.World = require('../support/world').World;

    this.When(/^there is a request to get the home route$/, function (callback) {
        var self = this;
        this.get('/')
        .then(function (resp) {
            self.resp = resp;
            return callback();
        });
    });

    this.Then(/^it should return a (.*) status code$/, function (status, callback) {
        var self = this;
        if (parseInt(self.resp.statusCode) !== parseInt(status)) {
            return callback.fail(self.resp.statusCode + ' !== ' + status);
        }
        return callback();
    });
}
