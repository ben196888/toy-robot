const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const io = require('../src/io');
const log = require('../src/log');

const expect = chai.expect;

describe('robotCmd', function() {
  const sandbox = sinon.createSandbox();
  const robotMoveStub = sandbox.stub();
  const robotRotateStub = sandbox.stub();
  const robotReportStub = sandbox.stub();
  const RobotSimulatorStub = sandbox.stub().returns({
    move: robotMoveStub,
    rotate: robotRotateStub,
    report: robotReportStub,
  });
  const robotCmd = proxyquire('../src/robotCmd', { '../src/robotSimulator': RobotSimulatorStub });
  const { validator, robotValidator, processor } = robotCmd;

  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
    // TODO: sandbox reset didn't work
    robotMoveStub.reset();
    robotRotateStub.reset();
    robotReportStub.reset();
  });

  describe('validator', function() {
    it('should return -1 when cmd is empty string', function() {
      expect(validator('')).to.equal(-1);
    });
    it('should throw an error when get invalid cmd', function() {
      expect(() => validator('invalid cmd')).to.throw('Command not found');
    });
    it('should return cmd index', function() {
      expect(validator('PLACE')).to.equal(0);
      expect(validator('MOVE')).to.equal(1);
      expect(validator('LEFT')).to.equal(2);
      expect(validator('RIGHT')).to.equal(3);
      expect(validator('REPORT')).to.equal(4);
    });
  });

  describe('robotValidator', function() {
    it('should ignore command and log warning when robot is not placed', function() {
      const logWarningStub = sandbox.stub(log, 'warning');
      robotValidator();
      expect(logWarningStub.calledOnceWith('Robot is not placed yet. Ignore commands')).to.be.true;
    });
  });

  describe('processor', function() {
    it('should not throw error when cmd is empty string', function() {
      expect(() => processor('', null)).to.not.throw();
    });
    it('should initialise a robot when place on a valid position and facing.', function() {
      processor('PLACE 0,3,NORTH');
      sinon.assert.calledOnce(RobotSimulatorStub);
    });
    it('should move robot when MOVE cmd', function() {
      processor('MOVE');
      sinon.assert.calledOnce(robotMoveStub);
    });
    it('should rotate robot when LEFT cmd', function() {
      processor('LEFT');
      sinon.assert.calledOnce(robotRotateStub);
    });
    it('should rotate robot when RIGHT cmd', function() {
      processor('RIGHT');
      sinon.assert.calledOnce(robotRotateStub);
    });
    it('should report robot position and facing when REPORT cmd', function() {
      sandbox.stub(io, 'println').callsFake(() => {});
      processor('REPORT', io);
      sinon.assert.calledOnce(robotReportStub);
    });
  });
});
