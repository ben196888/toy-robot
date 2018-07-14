const chai = require('chai');
const RobotSimulator = require('../src/robotSimulator');

const expect = chai.expect;

const newRobotSimulator = (args) => () => new RobotSimulator(args);

describe('robot simulator', function() {
  const VALID_POSISION = {
    x: 0,
    y: 3,
  };
  const VALID_FACING = 'NORTH';
  describe('constructor', function() {
    it('should throw an error when null position', function() {
      expect(newRobotSimulator({ position: undefined })).to.throw('Position is required');
    });

    it('should throw an error when null facing', function() {
      expect(newRobotSimulator({ position: {}, facing: undefined })).to.throw('Facing is required');
    });

    it('should throw an error when position is invalid', function() {
      expect(newRobotSimulator({ position: { x: 10 }, facing: 'facing' })).to.throw('Position 10, NaN is invalid');
    });

    it('should throw an error when facing is invalid', function() {
      expect(newRobotSimulator({ position: VALID_POSISION, facing: 'invalid facing' }))
        .to.throw('Facing invalid facing is invalid');
    });

    it('should place new robot on 0, 3 and facing NORTH', function() {
      const robot = new RobotSimulator({ position: VALID_POSISION, facing: VALID_FACING });
      expect(robot).to.has.property('position').to.deep.equal({ x: 0, y: 3 });
      expect(robot).to.has.property('facingIdx', 0);
    });
  });

  describe('methods existence', function() {
    const robot = new RobotSimulator({ position: VALID_POSISION, facing: VALID_FACING });
    it('should have rotate method', function() {
      expect(robot.rotate).to.be.a('function');
    });
    it('should have move method', function() {
      expect(robot.move).to.be.a('function');
    });
    it('should have report method', function() {
      expect(robot.report).to.be.a('function');
    });
  });

  describe('rotate', function() {
    let robot;
    beforeEach(function() {
      robot = new RobotSimulator({ position: VALID_POSISION, facing: VALID_FACING });
    });
    it('should throw an error when invalid rotation', function() {
      const invalidRotate = () => robot.rotate('invalid rotation');
      expect(invalidRotate).to.throw('Rotation invalid rotation is invalid');
    });

    it('should rotate from NORTH (idx: 0) to EAST (idx: 1) when rotation RIGHT', function() {
      robot.rotate('RIGHT');
      expect(robot).to.have.property('facingIdx', 1);
    });

    it('should rotate from NORTH (idx: 0) to WEST (idx: 3) when rotation LEFT', function() {
      robot.rotate('LEFT');
      expect(robot).to.have.property('facingIdx', 3);
    });
  });

  describe('move', function() {
    let robot;
    beforeEach(function() {
      robot = new RobotSimulator({ position: VALID_POSISION, facing: VALID_FACING });
    });
    it('should move from (0, 3) to (0, 4) when robot is facing NORTH', function() {
      robot.move();
      expect(robot).to.have.property('position').to.deep.equal({ x: 0, y: 4 });
    });

    it('should not move out of board when robot is on the edge', function() {
      // robot is on (0, 3) and facing north
      // rotate LEFT to facing WEST
      // robot have to stay on (0, 3) after move command
      robot.rotate('LEFT');
      robot.move();
      expect(robot).to.have.property('position').to.deep.equal({ x: 0, y: 3 });
    });
  });
});
