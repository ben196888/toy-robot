const BOARD_SIZE = 5;
const VALID_FACINGS = [
  'NORTH',
  'EAST',
  'SOUTH',
  'WEST',
];
const VALID_ROTATIONS = [
  'LEFT',
  'RIGHT',
];

const validPosition = pos => (0 <= pos && pos < BOARD_SIZE);
const getFacingIdx = facing => VALID_FACINGS.findIndex(f => facing === f);
const validFacing = facing => (getFacingIdx(facing) >= 0);
const getRotationIdx = rotation => VALID_ROTATIONS.findIndex(r => rotation === r);
const validRotation = rotation => (getRotationIdx(rotation) >= 0);

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

  rotate (rotation) {
    if (!validRotation(rotation)) {
      throw new Error(`Rotation ${rotation} is invalid`);
    }
    const facingsLen = VALID_FACINGS.length;
    const rotationIdx = getRotationIdx(rotation);
    // idx === 0: turn left => facingIdx - 1
    // idx === 1: turn right => facingIdx + 1
    const sign = rotationIdx ? (+1) : (-1);
    this.facingIdx = (this.facingIdx + sign * 1 + facingsLen) % facingsLen;
  }

  report () {
    const { x, y } = this.position;
    const facing = VALID_FACINGS[this.facingIdx];
    return `${x},${y},${facing}\n`;
  }
}

module.exports = RobotSimulator;
