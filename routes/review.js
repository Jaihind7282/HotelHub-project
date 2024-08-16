const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsyc.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controlllers/reviews.js");

//post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));


module.exports = router;