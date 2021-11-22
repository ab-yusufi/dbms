var express = require("express");
const { getPatientById, getPatient } = require("../controllers/patient");
const { isSignedIn, isAuthenticated } = require("../controllers/p_auth");
var router = express.Router();


router.param("pid", getPatientById);

router.get("/p/:pid", isSignedIn, isAuthenticated, getPatient);

module.exports  = router;