const Patient = require("../models/patient");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = await new Patient(req.body);
  await user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = async (req, res) => {
  const errors = await validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return await res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  await Patient.findOne({ email }, (err, user) => {
    if ( !user) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     return res.status(403).json({
//       error: "You are not ADMIN, Access denied",
//     });
//   }
//   next();
// };
