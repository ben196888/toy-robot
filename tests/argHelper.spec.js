const chai = require('chai');
const sinon = require('sinon');
const argHelper = require('../src/argHelper');
const log = require('../src/log');

const expect = chai.expect;

const INVALID_ARGV = ['node', 'src/index.js'];
const VALID_ARGV = ['node', 'src/index.js', 'stdin', 'stdout'];

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
    let logErrorStub, processExitStub;
    beforeEach(function() {
      process.argv = INVALID_ARGV;
      logErrorStub = sandbox.stub(log, 'error').callsFake(() => null);
      processExitStub = sandbox.stub(process, 'exit').callsFake(() => null);
    });
    it('should log the error message', function() {
      argHelper.exitWhenNotEnoughArgs();
      sinon.assert.calledOnce(logErrorStub);
    });
    it('should terminate the process', function() {
      argHelper.exitWhenNotEnoughArgs();
      sinon.assert.calledOnce(processExitStub);
      sinon.assert.calledWith(processExitStub, 1);
    });
    it('should terminate after log the error message', function() {
      argHelper.exitWhenNotEnoughArgs();
      expect(logErrorStub.calledBefore(processExitStub)).to.be.true;
    });
  });

  describe('getArgs', function() {
    beforeEach(function() {
      process.argv = VALID_ARGV;
    });
    it('should get argv[2] as inputFilename and argv[3] as outputFilename', function() {
      expect(argHelper.getArgs()).to.deep.equal({
        inputFilename: 'stdin',
        outputFilename: 'stdout',
      });
    });
  });
});
