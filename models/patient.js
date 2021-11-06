const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4 } = require("uuid");
var patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    city: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    bloodgroup: {
      type: String,
      maxlength: 4,
      trim: true,
      default: null,
    },
    dob: {
      type: Date,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 15,
      trim: true,
    },
  },
  { timestamps: true }
);

//Code to encrypt the password
patientSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

patientSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("Patient", patientSchema);
