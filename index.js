const io = require('./io');
const robotCmd = require('./robotCmd');

io.init(process.stdin, process.stdout);
io.onLine(robotCmd.validator, robotCmd.processor);
