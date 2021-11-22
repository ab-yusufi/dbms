const express = require("express");
const router = express.Router();

const {
  getHospitalById,
  getHospital
} = require("../controllers/hospital");
const { isSignedIn, isAuthenticated } = require("../controllers/h_auth");
// const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("hid", getHospitalById);

router.get("/h/:hid", isSignedIn, isAuthenticated, getHospital);
// router.put("/hospital/:hospitalId", isSignedIn, isAuthenticated, updatehospital);

module.exports = router;
