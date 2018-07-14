const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const Log = require('log');

const expect = chai.expect;

describe('log', function() {
  let log;
  const sandbox = sinon.createSandbox();
  let LogStub;
  beforeEach(function() {
    LogStub = sandbox.stub().returns({});
  });
  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
  });
  describe('instance of Log', function() {
    it('should be a instance of Log', function() {
      log = require('../src/log');
      expect(log instanceof Log).to.be.true;
    });
    it('should call constructor of Log', function() {
      log = proxyquire('../src/log', { 'log': LogStub });
      sinon.assert.calledOnce(LogStub);
    });
  });
  describe('log level', function() {
    let cachedProcessEnv;
    beforeEach(function() {
      cachedProcessEnv = process.env.ENV;
    });
    afterEach(function() {
      process.env.ENV = cachedProcessEnv;
    });
    it('should be in debug level when in development', function() {
      process.env.ENV = 'development';
      log = proxyquire('../src/log', { 'log': LogStub });
      sinon.assert.calledWith(LogStub, 'debug');
    });
    it('should be in error level by default', function() {
      process.env.ENV = 'other';
      log = proxyquire('../src/log', { 'log': LogStub });
      sinon.assert.calledWith(LogStub, 'error');
    });
  });
});
