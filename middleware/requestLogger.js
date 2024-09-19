const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
    next();
};

module.exports = requestLogger;
