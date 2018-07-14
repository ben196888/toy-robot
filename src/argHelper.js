const log = require('./log');

const printOnErrorMsg = () => {
  log.error('\
node src/index.js input output\n\
Example: node src/index.js stdin stdout\n\
         node src/index.js inputfile.txt stdout\n\
         node src/index.js stdin outputfile.txt\n\
         node src/index.js inputfile.txt outputfile.txt');
};

if (process.argv.length !== 4) {
  printOnErrorMsg();
  process.exit(1);
}

function getArgs() {
  const inputFilename = process.argv[2];
  const outputFilename = process.argv[3];
  return {
    inputFilename,
    outputFilename,
  };
}

module.exports = {
  getArgs,
};
