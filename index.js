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
};

rl.on('line', (input) => {
  console.debug(`Get input ${input}`);
  validator(input)
  proc(input);
});

const proc = cmd => {
  // TODO: do the command
};
