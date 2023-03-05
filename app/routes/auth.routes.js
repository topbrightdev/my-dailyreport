const controller = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt");
const signValidate = require("../middlewares/signValidate");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [signValidate.signupandinValidate, signValidate.signupemailValidate, signValidate.signupnameValidate],
    controller.signup
  );

  app.post(
    "/api/auth/signin",
    [signValidate.signupandinValidate],
    controller.signin
  );
  app.post(
    "/api/auth/signin/token",
    [authJwt.verifyToken],
    controller.signinwithtoken
  );

  app.post("/api/auth/changeemail", controller.changeemail);

  app.post("/api/auth/signout", controller.signout);
  

  // https://localhost:8080/all-report/:date/:name/:id
  // const date = req.params.date
  // const name = req.params.name

  // https://localhost:8080/all-report/2023.02.23/john/13

};
