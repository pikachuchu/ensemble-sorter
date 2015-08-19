var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var sinon = require('sinon');
var Q = require('q');

chai.use(require('sinon-chai'));

describe('Datastore', function () {
    var datastore;
    var orchestrate;
    var db;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    beforeEach(function () {
        db = {
            get: sinon.stub(),
            put: sinon.stub()
        };
        orchestrate = sinon.stub().returns(db);
        mockery.registerMock('orchestrate', orchestrate);
        datastore = require('../datastore');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function () {
        mockery.disable();
    });

    it('should get data by the key', function (done) {
        db.get.returns(Q({
            cats: 'are',
            the: 'cutest'
        }));

        datastore.getByKey('foo', 'bar')
        .then(function (result) {
            expect(db.get).to.have.been.calledWith('foo', 'bar');
            expect(result).to.deep.equal({
                cats: 'are',
                the: 'cutest'
            });
        })
        .done(done);
    });

    it('should throw an error if get fails', function (done) {
        db.get.returns(Q.reject('get error'));

        datastore.getByKey('foo', 'non-existent-key')
        .then(function () {
            expect(false).to.be.ok;
        })
        .catch(function (error) {
            expect(error).to.equal('get error');
        })
        .done(done);
    });

    it('should update data by the key', function (done) {
        db.put.returns(Q());

        datastore.updateByKey('foo', 'bar')
        .then(function () {
            expect(db.put).to.have.been.calledWith('foo', 'bar');
        })
        .done(done);
    });

    it('should throw an error if put fails', function (done) {
        db.put.returns(Q.reject('put error'));

        datastore.updateByKey('foo', 'bar')
        .then(function () {
            expect(false).to.be.ok;
        })
        .catch(function (error) {
            expect(error).to.equal('put error');
        })
        .done(done);
    });
});
