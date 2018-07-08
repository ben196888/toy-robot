const readline = require('readline');

let rl;
const validator = () => {
  if (!rl) {
    throw new Error('readline is not initialised.');
  }
}

function init(input, output, options = {}) {
  // Ignore init when rl is initialised
  if (rl) {
    return;
  }

  rl = readline.createInterface({
    prompt: '',
    ...options,
    input,
    output,
  });
}

function onLine(cmdValidator, cmdProcessor) {
  validator();
  rl.on('line', (input) => {
    console.debug(`Get input ${input}`);
    const cmdIdx = cmdValidator(input);
    cmdProcessor(cmdIdx, input);
  });
}

function print(str) {
  validator();
  rl.setPrompt(str);
  rl.prompt();
}

module.exports = {
  init,
  onLine,
  print,
};
