const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsyc = require("../utils/wrapAsyc");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controlllers/users.js");

router
    .route("/signup")
    .get((req, res) => {
      res.render("users/signup.ejs");
    })
    .post(wrapAsyc(userController.signup));

router
    .route("/login")  
    .get(userController.renderSignupForm)
    .post(
      saveRedirectUrl, 
      passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
      }),
    userController.login
);

router.get("/logout" , userController.logout);

module.exports = router;