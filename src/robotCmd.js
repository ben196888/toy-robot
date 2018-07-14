const RobotSimulator = require('./robotSimulator');
const log = require('./log');

let robot;
const robotValidator = () => {
  // A robot that is not on the table can choose
  // then ignore the MOVE, LEFT, RIGHT and REPORT commands.
  if (!robot) {
    // throw new Error('Robot is not placed yet.');
    log.warn('Robot is not placed yet. Ignore commands');
  }
};

/** VALID COMMANDS
 * PLACE X,Y,F
 * MOVE
 * LEFT
 * RIGHT
 * REPORT
 */
const VALID_COMMANDS = [
  'PLACE',
  'MOVE',
  'LEFT',
  'RIGHT',
  'REPORT',
];

const validator = (cmd) => {
  log.debug(`Validate ${cmd}`);
  const trimmedCmd = cmd.trim();
  if (trimmedCmd === '') {
    return -1;
  }
  const idx = VALID_COMMANDS.findIndex(str => trimmedCmd.startsWith(str));
  if (idx < 0) {
    throw new Error('Command not found');
  }
  log.debug('Command validated');
  return idx;
};

const initCmdParser = initCmd => {
  log.debug('Parse init cmd');
  const parsedInitCmd = initCmd.split(' ');
  if (parsedInitCmd.length !== 2) {
    throw new Error(`${initCmd} should be in format 'PLACE X,Y,F'`);
  }

  // position and facing
  const posAndFace = parsedInitCmd[1];
  const parsedPosAndFace = posAndFace.split(',');
  if (parsedPosAndFace.length !== 3) {
    throw new Error(`${posAndFace} should be in format X,Y,F`);
  }

  const [x, y, facing] = parsedPosAndFace;
  const position = { x, y };
  log.debug('Parsed init cmd args (position, facing)');
  return {
    position,
    facing,
  };
};

function processor(cmd, io) {
  const cmdIdx = validator(cmd);
  switch (cmdIdx) {
  case -1:
    // special case: ignore empty line
    break;
  case 0:
    // initialise
    robot = new RobotSimulator(initCmdParser(cmd));
    break;
  case 1:
    // move
    robotValidator();
    robot.move();
    break;
  case 2:
  case 3:
    // rotate
    robotValidator();
    robot.rotate(cmd);
    break;
  case 4:
    // report
    robotValidator();
    io.println(robot.report());
    break;
  default:
    throw new Error('Unknown valid command');
  }
}

module.exports = {
  processor,
};
