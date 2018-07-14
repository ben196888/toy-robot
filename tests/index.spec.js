const chai = require('chai');
const sinon = require('sinon');
const io = require('../src/io');
const robotCmd = require('../src/robotCmd');
const argHelper = require('../src/argHelper');
const { requireUncached } = require('./helpers');

const expect = chai.expect;

describe('index', function() {
  const sandbox = sinon.createSandbox();
  let argHelperExitWhenNotEnoughArgsStub,
    argHelperGetArgsStub,
    robotCmdProcessorStub,
    ioInitStub,
    ioOnLineStub;
  beforeEach(function() {
    argHelperExitWhenNotEnoughArgsStub = sandbox.stub(argHelper, 'exitWhenNotEnoughArgs')
      .callsFake(() => null);
    argHelperGetArgsStub = sandbox.stub(argHelper, 'getArgs')
      .callsFake(() => ({ inputFilename: 'stdin', outputFilename: 'stdout' }));
    robotCmdProcessorStub = sandbox.stub(robotCmd, 'processor').callsFake(() => null);
    ioInitStub = sandbox.stub(io, 'init').callsFake(() => null);
    ioOnLineStub = sandbox.stub(io, 'onLine').callsFake((fn) => {
      fn('CMD');
      sinon.assert.calledOnce(robotCmdProcessorStub);
      sinon.assert.calledWith(robotCmdProcessorStub, 'CMD');
    });
    requireUncached('../src/index');
  });
  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
  });
  it('should called all functions once', function() {
    sinon.assert.calledOnce(argHelperExitWhenNotEnoughArgsStub);
    sinon.assert.calledOnce(argHelperGetArgsStub);
    sinon.assert.calledOnce(ioInitStub);
    sinon.assert.calledOnce(ioOnLineStub);
  });
  it('should called functions in order', function() {
    expect(argHelperExitWhenNotEnoughArgsStub.calledBefore(argHelperGetArgsStub)).to.be.true;
    expect(argHelperGetArgsStub.calledBefore(ioInitStub)).to.be.true;
    expect(ioInitStub.calledBefore(ioOnLineStub)).to.be.true;
  });
});
