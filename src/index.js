require('./log');
const io = require('./io');
const robotCmdProcessor = require('./robotCmd').processor;
const { exitWhenNotEnoughArgs, getArgs } = require('./argHelper');

exitWhenNotEnoughArgs();

const { inputFilename, outputFilename } = getArgs();

io.init(inputFilename, outputFilename);
io.onLine(cmd => robotCmdProcessor(cmd, io));
