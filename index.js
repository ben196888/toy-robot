const io = require('./io');
const robotCmdProcessor = require('./robotCmd').processor;
const getArgs = require('./argHelper').getArgs;

const { inputFilename, outputFilename } = getArgs();

io.init(inputFilename, outputFilename);
io.onLine(cmd => robotCmdProcessor(cmd, io));
