require('dotenv').config();  // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,  // For token signing
    services: {
        userServiceUrl: process.env.USER_SERVICE_URL,
        billingServiceUrl: process.env.BILLING_SERVICE_URL,
        dashboardServiceUrl: process.env.DASHBOARD_SERVICE_URL,
        // Add more services as required
    }
};
