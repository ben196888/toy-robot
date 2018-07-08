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

function onLine(listener) {
  validator();
  rl.on('line', (input) => {
    console.debug(`Get input ${input}`);
    listener(input);
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
