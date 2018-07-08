const readline = require('readline');
const robotSimulator = require('./robotSimulator');

let robot;
const robotValidator = () => {
  if (!robot) {
    throw new Error('Robot is not placed yet.');
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** VALID COMMANDS
 * PLACE X,Y,F
 * MOVE
 * LEFT
 * RIGHT
 * REPORT
 */

const validStartsWith = [
  'PLACE',
  'MOVE',
  'LEFT',
  'RIGHT',
  'REPORT',
];

const validator = (cmd) => {
  console.debug(`Validate ${cmd}`);
  const idx = validStartsWith.findIndex(str => cmd.startsWith(str));
  if (idx < 0) {
    throw new Error('Command not found');
  }
  console.debug(`Command validated`);
  return idx;
};

rl.on('line', (input) => {
  console.debug(`Get input ${input}`);
  const cmdIdx = validator(input);
  proc(cmdIdx, input);
});

const proc = (cmdIdx, cmd) => {
  // TODO: do the command
  switch (cmdIdx) {
  case 0:
    // initialise
    const initCmdArgs = initCmdParser(cmd);
    robot = new robotSimulator(initCmdArgs);
    break;
  case 1:
    // move
    robotValidator();
    break;
  case 2:
  case 3:
    // rotate
    robotValidator();
    break;
  case 4:
    // report
    robotValidator();
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
