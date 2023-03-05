const { passwordReg, mailReg } = require("../config/const.config");
const db = require("../models");
const User = db.user;

signupandinValidate = (req, res, next) => {
  if (!mailReg.test(req.body.email)) {
    res.status(500).send({ message: "Please enter a correct email." });
    return;
  }

  if (!passwordReg.test(req.body.password)) {
    res.status(500).send({
      message:
        "Please enter a strong password. Password must be at least 8 characters and contain at least one special character and number.",
    });
    return;
  }
  next();
};

signupemailValidate = (req, res, next) => {
  User.findOne({
    email: req.body.email,
    
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! user is already exist" });
      return;
    }
    next();
  });
};

signupnameValidate = (req, res, next) => {
  User.findOne({
    name: req.body.name,
    
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (data) {
      res.status(400).send({ message: "Failed! user is already exist" });
      return;
    }
    next();
  });
};

const signValidate = {
  signupandinValidate,
  signupemailValidate,
  signupnameValidate
};

module.exports = signValidate;
