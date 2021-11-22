var express = require("express");
var router = express.Router();
const { createBooking, updateBooking, deleteBooking, getAllBookings, getBooking, getBookingById } = require("../controllers/booking");
const { getPatientById } = require("../controllers/patient");
const { isSignedIn, isAuthenticated } = require("../controllers/p_auth");
const { getServiceById } = require("../controllers/service");

router.param("pid", getPatientById);
router.param("bookingId", getBookingById);
router.param("serviceId", getServiceById);

// Create A Booking
router.post("/:pid/:serviceId/b/create/", isSignedIn, isAuthenticated, createBooking);
// Update A Booking
router.put("/:pid/:serviceId/b/update/:bookingId", isSignedIn, isAuthenticated, updateBooking);
// Delete A Booking
router.delete("/:pid/b/delete/:bookingId", isSignedIn, isAuthenticated, deleteBooking);
//Get All Bookings
router.get("/bookings", getAllBookings);
// Get Booking
router.get("/booking/:bookingId", getBooking);

module.exports = router;
