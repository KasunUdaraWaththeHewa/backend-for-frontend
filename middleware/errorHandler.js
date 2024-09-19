const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message
    });
};

module.exports = errorHandler;
