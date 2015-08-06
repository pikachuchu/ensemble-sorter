var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('Routes', function () {
    var routes;
    var express;
    var handler;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    beforeEach(function () {
        var router = sinon.stub().returns({
            get: sinon.stub()
        });

        express = {
            Router: router
        };

        mockery.registerMock('express', express);

        handler = {
            handleGet: sinon.stub()
        };
        mockery.registerMock('./handler', handler);

        routes = require('../routes');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function () {
        mockery.disable();
    });

    it('should have an express router', function () {
        expect(express.Router).to.be.called;
    });

    it('should have a route for GET /', function () {
        expect(express.Router().get).to.be.calledWith('/', handler.handleGet);
    });
});
