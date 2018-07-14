const readline = require('readline');
const fs = require('fs');
const path = require('path');
const log = require('./log');

let rl;
const validator = () => {
  if (!rl) {
    throw new Error('readline is not initialised.');
  }
};

function init(inputFilename, outputFilename, options = {}) {
  let input, output;
  // Ignore init when rl is initialised
  if (rl) {
    return;
  }

  if (inputFilename.toLowerCase() === 'stdin') {
    input = process.stdin;
  } else {
    const inputPath = path.join(__dirname, '..', inputFilename);
    input = fs.createReadStream(inputPath);
  }

  if (outputFilename.toLowerCase() === 'stdout') {
    output = process.stdout;
  } else {
    const outputPath = path.join(__dirname, '..', outputFilename);
    output = fs.createWriteStream(outputPath);
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
    log.debug(`Get input ${input}`);
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
