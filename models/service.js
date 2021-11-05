const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    hospital: {
      type: ObjectId,
      ref: "Hospital",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: null,
    },
    time: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
