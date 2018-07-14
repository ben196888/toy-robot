const log = require('./log');

const printOnErrorMsg = () => {
  log.error('\
node index.js input output\n\
Example: node index.js stdin stdout\n\
         node index.js inputfile.txt stdout\n\
         node index.js stdin outputfile.txt\n\
         node index.js inputfile.txt outputfile.txt');
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
