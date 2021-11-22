const Hospital = require("../models/hospital");

exports.getHospitalById = async (req, res, next, id) => {
  await Hospital.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getHospital = async (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return await res.json(req.profile);
};

exports.getAllHospitals = async (req, res) => {
  
  Hospital.find().exec((err, hospitals) => {
    if(err){
      return res.status(400).json({
        error: "Something went wrong with hospitals"
      })
    } 
    res.json(hospitals);
  })
};
