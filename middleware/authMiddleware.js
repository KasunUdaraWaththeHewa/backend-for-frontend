const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');

const publicRoutes = [
    "/user/login",
    "/user/signup",
    "/user/forgotpassword",
    "/user/resetpassword",
    "/user/changepassword"
];

const isPublicRoute = (req) => {
    return publicRoutes.some(route => req.path.startsWith(route));
};

const authMiddleware = (req, res, next) => {
    if (isPublicRoute(req)) {
        return next();
    }

    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = authMiddleware;
