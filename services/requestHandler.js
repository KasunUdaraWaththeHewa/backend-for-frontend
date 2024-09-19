const axios = require("axios");

const serviceMap = {
  "/user": process.env.USER_SERVICE_URL,
  "/billing": process.env.BILLING_SERVICE_URL,
  "/dashboard": process.env.DASHBOARD_SERVICE_URL,
};

const requestHandler = async (req, res) => {
  try {
    const serviceURL = getServiceUrl(req.path);
    if (!serviceURL) {
      return res.status(404).json({ message: "Service not found" });
    }
    console.log(`Forwarding request to ${serviceURL}${req.path}`);

    const response = await axios({
      method: req.method.toLowerCase(),
      url: `${serviceURL}${req.path}`,
      data: req.body,
      headers: req.headers,
      params: req.query,
    });
    logger.info(`Response from ${serviceURL}: ${response.status}`);

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      logger.error(
        `Error from service ${serviceURL}: ${error.response.status}`
      );

      return res
        .status(error.response.status)
        .json({ message: error.response.data });
    } else if (error.request) {
      return res.status(500).json({ message: "No response from service" });
    } else {
      return res.status(500).json({ message: "Error setting up the request" });
    }
  }
};

const getServiceUrl = (path) => {
  const basePath = `/${path.split("/")[1]}`;
  return serviceMap[basePath] || null;
};

module.exports = requestHandler;
