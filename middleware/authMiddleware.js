const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;  // Attach decoded token payload to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = authMiddleware;
