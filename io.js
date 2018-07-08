const readline = require('readline');
const fs = require('fs');

let rl;
const validator = () => {
  if (!rl) {
    throw new Error('readline is not initialised.');
  }
}

function init(inputFilename, outputFilename, options = {}) {
  let input, output;
  // Ignore init when rl is initialised
  if (rl) {
    return;
  }

  if (inputFilename.toLowerCase() === 'stdin') {
    input = process.stdin;
  } else {
    input = fs.createReadStream(inputFilename);
  }

  if (outputFilename.toLowerCase() === 'stdout') {
    output = process.stdout;
  } else {
    output = fs.createWriteStream(outputFilename);
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
