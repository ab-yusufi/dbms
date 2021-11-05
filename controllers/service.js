const Service = require("../models/service");

exports.createService = async (req, res) => {
  req.body.hospital = req.profile;

  const service = new Service(req.body);

  service.save((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create service",
      });
    }
    res.json(service);
  });
};
