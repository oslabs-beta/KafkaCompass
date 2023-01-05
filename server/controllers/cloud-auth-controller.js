const { encrypt, decrypt } = require("../encryption");

const cloudAuthController = {};

cloudAuthController.encryptCredentials = (req, res, next) => {
  const {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    bootstrapServer,
    cluster_name
  } = req.body;

  const credentials = {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    bootstrapServer,
    cluster_name
  };

  for (const key in credentials) {
    credentials[key] = encrypt(credentials[key]);
  }

  res.locals.credentials = credentials;
  return next();
};

cloudAuthController.decryptCredentials = (req, res, next) => {};

module.exports = cloudAuthController;
