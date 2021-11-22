const mongoose = require("mongoose");
const {ObjectId, Schema} = mongoose;

const bookingSchema = new Schema({
    hospital: {
        type: ObjectId,
        ref: "Hospital"
    },
    service: {
        type: ObjectId,
        ref: "Service",
    },
    date: {
        type: Date,
        required: true,
    },
    patient: {
        type: ObjectId,
        ref: "Patient"
    }
}, {timestamps: true});

module.exports = mongoose.model("Booking", bookingSchema);