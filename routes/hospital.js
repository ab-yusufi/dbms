const express = require("express");
const router = express.Router();

const {
  getHospitalById,
  getHospital,
  updateHospital,
} = require("../controllers/hospital");
// const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("hid", getHospitalById);

// router.get("/hospital/:hospitalId", isSignedIn, isAuthenticated, gethospital);
// router.put("/hospital/:hospitalId", isSignedIn, isAuthenticated, updatehospital);

module.exports = router;
