const BOARD_SIZE = 5;
const VALID_FACINGS = [
  'NORTH',
  'EAST',
  'SOUTH',
  'WEST',
];

const validPosition = pos => (0 <= pos && pos < BOARD_SIZE);
const getFacingIdx = facing => VALID_FACINGS.findIndex(f => facing === f);
const validFacing = facing => (getFacingIdx(facing) >= 0);

class RobotSimulator {
  constructor (args) {
    const { position, facing } = args;
    if (!position) {
      throw new Error('Position is required');
    }
    if (!facing) {
      throw new Error('Facing is required');
    }

    const { x, y } = position;
    if (!validPosition(x) || !validPosition(y)) {
      throw new Error(`Position ${x}, ${y} is invalid`);
    }
    if (!validFacing(facing)) {
      throw new Error(`Facing ${facing} is invalid`);
    }

    console.debug(`Place new robot on ${x}, ${y} and facing ${facing}`);
    this.position = position;
    this.facingIdx = getFacingIdx(facing);
  }
}

module.exports = RobotSimulator;
