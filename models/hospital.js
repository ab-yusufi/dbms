const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4 } = require("uuid");
const { ObjectId } = mongoose.Schema;
var hospitalSchema = new mongoose.Schema(
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
    phone: {
      type: Number,
      required: true,
      maxlength: 15,
      trim: true,
    },
    services: [
      {
        type: ObjectId,
        ref: "Service",
      },
    ],

  },
  { timestamps: true }
);

//Code to encrypt the password
hospitalSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

hospitalSchema.methods = {
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

module.exports = mongoose.model("Hospital", hospitalSchema);
