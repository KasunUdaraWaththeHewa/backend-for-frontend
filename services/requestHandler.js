const axios = require('axios');

const serviceMap = {
    '/user': process.env.USER_SERVICE_URL,
    '/billing': process.env.BILLING_SERVICE_URL,
    '/dashboard': process.env.DASHBOARD_SERVICE_URL,
    // Add more services as needed
};

const requestHandler = async (req, res) => {
    try {
        const serviceURL = getServiceUrl(req.path);
        if (!serviceURL) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const response = await axios({
            method: req.method.toLowerCase(),
            url: `${serviceURL}${req.path}`,
            data: req.body,
            headers: req.headers,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error communicating with service' });
    }
};

const getServiceUrl = (path) => {
    // Map request path to the corresponding service URL
    const basePath = `/${path.split('/')[1]}`;  // Extract base path (/user, /billing, etc.)
    return serviceMap[basePath] || null;
};

module.exports = requestHandler;
