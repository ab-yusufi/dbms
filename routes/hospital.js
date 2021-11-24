const express = require("express");
const router = express.Router();

const {
  getHospitalById,
  getHospital,
  getAllHospitals
} = require("../controllers/hospital");
const { isSignedIn, isAuthenticated } = require("../controllers/h_auth");
// const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("hid", getHospitalById);

router.get("/h/:hid",getHospital);
router.get("/hospitals",getAllHospitals);
// router.put("/hospital/:hospitalId", isSignedIn, isAuthenticated, updatehospital);

module.exports = router;
