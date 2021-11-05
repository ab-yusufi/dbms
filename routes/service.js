var express = require("express");
var router = express.Router();
const { createService } = require("../controllers/service");
const { getHospitalById } = require("../controllers/hospital");
const { isSignedIn, isAuthenticated } = require("../controllers/h_auth");

router.param("hid", getHospitalById);
// Create A Service
router.post("/:hid/s/create", isSignedIn, isAuthenticated, createService);
// Update A Service
// router.post("/:hid/s/update", isSignedIn, isAuthenticated, updateService);
// Delete A Service
// Get All Services

module.exports = router;
