var express = require("express");
var router = express.Router();
const { createService, updateService, deleteService, getAllServices, getService, getServiceById, getServicesByHospital } = require("../controllers/service");
const { getHospitalById } = require("../controllers/hospital");
const { isSignedIn, isAuthenticated } = require("../controllers/h_auth");

router.param("hid", getHospitalById);
router.param("serviceId", getServiceById);

// Create A Service
router.post("/:hid/s/create", isSignedIn, isAuthenticated, createService);
//Get All Services
router.get("/services", getAllServices);
// Get Service
router.get("/service/:serviceId", getService);
// Update A Service
router.put("/:hid/s/update/:serviceId", isSignedIn, isAuthenticated, updateService);
// Delete A Service
router.delete("/:hid/s/delete/:serviceId", isSignedIn, isAuthenticated, deleteService);
//Get Services By Hospital
router.get("/:hid/services", getServicesByHospital);
module.exports = router;
