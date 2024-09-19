const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
    next();  // Move to the next middleware or route handler
};

module.exports = requestLogger;
