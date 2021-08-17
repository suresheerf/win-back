const express = require('express');
const reviewController = require('./../controlers/reviewController');
const authController = require('./../controlers/authController');

const Router = express.Router({mergeParams: true});

Router.route('/').
get(reviewController.getAllReviews).
post(authController.protect,authController.restrictTo('user'),reviewController.createReview);

module.exports = Router;