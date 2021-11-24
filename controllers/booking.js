const Booking = require("../models/booking");

exports.getBookingById = (req, res, next, id) => {
  Booking.findById(id).exec((err, booking) => {
    if (err || !booking) {
      return res.status(400).json({
        error: "No booking was found in DB",
      });
    }
    req.booking = booking;
    next();
  });
};

exports.createBooking = async (req, res) => {
  req.body.service = req.service;
  req.body.patient = req.patient;

  const booking = new Booking(req.body);

  booking.save((err, booking) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create booking",
      });
    }
    res.json(booking);
  });
};

exports.getAllBookings = (req, res) => {
  Booking.find().exec((err, bookings) => {
    if (err) {
      return res.status(400).json({
        error: "NO bookings found",
      });
    }
    res.json(bookings);
  });
};

exports.getBooking = (req, res) => {
  return res.json(req.booking);
};

exports.getBookingssByPatient = async (req, res) => {
   Booking.find({patient: req.patient}).exec((err, bookings) => {
    if (err) {
      return res.status(400).json({
        error: "NO bookings found",
      });
    }
    res.json(bookings);
  })
}

exports.updateBooking = (req, res) => {
  Booking.findByIdAndUpdate(
    { _id: req.booking._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, booking) => {
      if (err) {
        return res.status(400).json({
          error: "Error in updating the booking",
        });
      }
      res.json(booking);
    }
  );
};

exports.deleteBooking = (req, res) => {
  const booking = req.booking;
  console.log(booking);
  booking.remove((err, booking) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this booking",
      });
    }
    res.json({
      message: "Successfull deleted booking",
    });
  });
};
