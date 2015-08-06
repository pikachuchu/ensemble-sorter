var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var sinon = require('sinon');
var q = require('q');

chai.use(require('sinon-chai'));

describe('Handler', function () {
    var handler;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    beforeEach(function () {
        handler = require('../handler');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function () {
        mockery.disable();
    });

    it('should be have a handler for GET /', function () {
        var res = {
            send: sinon.stub()
        };
        handler.handleGet(null, res);
        expect(res.send).to.be.called;
    });
});
