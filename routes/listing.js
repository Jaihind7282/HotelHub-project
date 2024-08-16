const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controlllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const uplode = multer({storage});




//index Route
router.get("/", wrapAsync(listingController.index));

//new Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post("/",
    isLoggedIn,
    uplode.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.createListing),
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//Update Route
router.put("/:id", isLoggedIn, isOwner,uplode.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, listingController.deleteListing);

module.exports = router; 