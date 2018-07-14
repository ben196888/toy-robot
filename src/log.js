const Log = require('log');
const LOG_LEVEL = process.env.ENV === 'development' ? 'debug' : 'error';

const logger = new Log(LOG_LEVEL);

module.exports = logger;
