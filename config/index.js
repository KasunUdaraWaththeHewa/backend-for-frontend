require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,
    services: {
        userServiceUrl: process.env.USER_SERVICE_URL,
        billingServiceUrl: process.env.BILLING_SERVICE_URL,
        dashboardServiceUrl: process.env.DASHBOARD_SERVICE_URL,
        // Add more services as required
    }
};
