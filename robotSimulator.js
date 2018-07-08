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

    const x = parseInt(position.x, 10);
    const y = parseInt(position.y, 10);
    if (!validPosition(x) || !validPosition(y)) {
      throw new Error(`Position ${x}, ${y} is invalid`);
    }
    if (!validFacing(facing)) {
      throw new Error(`Facing ${facing} is invalid`);
    }

    console.debug(`Place new robot on ${x}, ${y} and facing ${facing}`);
    this.position = { x, y };
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

  move (/* steps */) {
    // The origin (0,0) can be considered to be the SOUTH WEST most corner.
    // odd facing idx means on EAST and WEST direction => modify x
    // even facing idx means on NORTH and SOUTH direction => modify y
    const steps = 1;
    const modifyX = Boolean(this.facingIdx % 2);
    const modifyY = !modifyX;
    const direction = Boolean(this.facingIdx >> 1);
    const sign = direction ? (-1) : (+1);

    const { x, y } = this.position;
    let newX = modifyX ? x + sign * steps : x;
    let newY = modifyY ? y + sign * steps : y;
    if (!validPosition(newX) || !validPosition(newY)) {
      console.warn('Move cause robot to fall. Ingore this move.');
      [newX, newY] = [x, y];
    }
    const position = {
      x: newX,
      y: newY,
    };
    this.position = position;
  }

  report () {
    const { x, y } = this.position;
    const facing = VALID_FACINGS[this.facingIdx];
    return `${x},${y},${facing}\n`;
  }
}

module.exports = RobotSimulator;
