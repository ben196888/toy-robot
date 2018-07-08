const readline = require('readline');

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
};
