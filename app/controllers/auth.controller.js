const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const mailsend = require("../utils/mailsend");
const { user } = require("../models");



exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      message: "Your account has been successfully saved",
    });
  });
};
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    res.status(200).send({
      message: "User was logined successfully!",
      user: {
        id: user._id,
        email: user.email,
        name:user.name,
      },
      token: token,
    });
  });
};

exports.signinwithtoken = (req, res) => {
  const decodedId = jwt.decode(req.body.token, config.secret);

  User.findOne({
    _id: decodedId.id,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });
  });
};

exports.changeemail = (req, res) => {
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { email: req.body.newemail }
  ).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "Expired time is over." });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    mailsend(
      "Email Verify",
      req.body.newemail,
      `http://localhost:3000/signup/verify/${token}`,
      "Please click below button to verify your new email"
    );
    res.status(200).send({
      message: "Email will be sent",
    });
  });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
