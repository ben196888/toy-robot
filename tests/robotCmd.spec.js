const chai = require('chai');
const sinon = require('sinon');
const log = require('../src/log');
const robotCmd = require('../src/robotCmd');

const expect = chai.expect;

const { validator, robotValidator } = robotCmd;

describe('robotCmd', function() {
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
      const logWarningStub = sinon.stub(log, 'warning');
      robotValidator();
      expect(logWarningStub.calledOnceWith('Robot is not placed yet. Ignore commands')).to.be.true;
    });
  });
});
