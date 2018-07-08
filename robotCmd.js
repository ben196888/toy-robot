const robotSimulator = require('./robotSimulator');

let robot;
const robotValidator = () => {
  // A robot that is not on the table can choose
  // then ignore the MOVE, LEFT, RIGHT and REPORT commands.
  if (!robot) {
    // throw new Error('Robot is not placed yet.');
    console.warn('Robot is not placed yet. Ignore commands');
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
  console.debug(`Validate ${cmd}`);
  const idx = VALID_COMMANDS.findIndex(str => cmd.startsWith(str));
  if (idx < 0) {
    throw new Error('Command not found');
  }
  console.debug(`Command validated`);
  return idx;
};

const processor = (cmdIdx, cmd) => {
  switch (cmdIdx) {
  case 0:
    // initialise
    const initCmdArgs = initCmdParser(cmd);
    robot = new robotSimulator(initCmdArgs);
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
    const report = robot.report();
    io.print(report);
    break;
  default:
    throw new Error('Unknown valid command');
  }
};

const initCmdParser = initCmd => {
  console.debug('Parse init cmd');
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
  console.debug('Parsed init cmd args (position, facing)');
  return {
    position,
    facing,
  };
};

module.exports = {
  validator,
  processor,
};
