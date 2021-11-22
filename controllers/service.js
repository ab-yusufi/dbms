const Service = require("../models/service");

exports.getServiceById = (req, res, next, id) => {
  Service.findById(id).exec((err, service) => {
    if (err || !service) {
      return res.status(400).json({
        error: "No service was found in DB",
      });
    }
    req.service = service;
    next();
  });
};

exports.createService = async (req, res) => {
  req.body.hospital = req.profile;

  const service = await new Service(req.body);

  await service.save((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create service",
      });
    }
    res.json(service);
  });
};

exports.getAllServices = async (req, res) => {
  await Service.find().exec((err, services) => {
    if (err) {
      return res.status(400).json({
        error: "NO services found",
      });
    }
    res.json(services);
  });
};

exports.getService = async (req, res) => {
  return res.json(req.service);
};

exports.getServicesByHospital = async (req, res) => {
  await Service.find({hospital: req.profile}).exec((err, services) => {
    if (err) {
      return res.status(400).json({
        error: "NO services found",
      });
    }
    res.json(services);
  })
}

exports.updateService = async (req, res) => {
  await Service.findByIdAndUpdate(
    { _id: req.service._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, service) => {
      if (err) {
        return res.status(400).json({
          error: "Error in updating the service",
        });
      }
      res.json(service);
    }
  );
};

exports.deleteService = async (req, res) => {
  const service = req.service;
  await service.remove((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this service",
      });
    }
    res.json({
      message: "Successfull deleted service",
    });
  });
};
