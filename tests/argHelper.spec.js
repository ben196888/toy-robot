const chai = require('chai');
const sinon = require('sinon');
const argHelper = require('../src/argHelper');
const log = require('../src/log');

const expect = chai.expect;

const INVALID_ARGV = ['node', 'src/index.js'];

describe('argHelper', function() {
  const sandbox = sinon.createSandbox();
  let cachedProcessArgv;
  beforeEach(function() {
    cachedProcessArgv = process.argv;
  });
  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
    process.argv = cachedProcessArgv;
  });
  describe('exitWhenNotEnoughArgs', function() {
    let processExitStub;
    beforeEach(function() {
      process.argv = INVALID_ARGV;
      processExitStub = sandbox.stub(process, 'exit').callsFake(() => null);
    });
    it('should log the error message', function() {
      const logErrorSpy = sandbox.spy(log, 'error');
      argHelper.exitWhenNotEnoughArgs();
      sinon.assert.calledOnce(logErrorSpy);
    });
    it('should terminate the process', function() {
      argHelper.exitWhenNotEnoughArgs();
      sinon.assert.calledOnce(processExitStub);
      sinon.assert.calledWith(processExitStub, 1);
    });
    it('should terminate after log the error message', function() {
      const logErrorSpy = sandbox.spy(log, 'error');
      argHelper.exitWhenNotEnoughArgs();
      expect(logErrorSpy.calledBefore(processExitStub)).to.be.true;
    });
  });
});
