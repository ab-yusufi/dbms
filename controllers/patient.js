const Patient = require("../models/patient");

exports.getPatientById = async (req, res, next, id) => {
  await Patient.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.patient = user;
    next();
  });
};

exports.getPatient = async (req, res) => {
  req.patient.salt = undefined;
  req.patient.encry_password = undefined;
  return await res.json(req.patient);
};
