const io = require('./io');
const robotCmdProcessor = require('./robotCmd').processor;

io.init(process.stdin, process.stdout);
io.onLine(robotCmdProcessor);
