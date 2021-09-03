const express = require('express');
const viewController = require('../controlers/viewController');
const authController = require('../controlers/authController');
const notificationController = require('../controlers/notificationController');

const router = express.Router();


router.get('/',authController.isLoggedIn,notificationController.getAll,viewController.getHome);
router.get('/courses',authController.isLoggedIn,viewController.getCourses);
router.get('/createcourse',authController.protect,authController.restrictTo('admin'),viewController.createCourse);
router.get('/courses/:id',authController.isLoggedIn,viewController.getCourse);
router.get('/user/me',authController.protect,viewController.getUser);
router.get('/login',viewController.getLogin);
router.get('/signup',viewController.getSignup);
router.get('/forgotPassword',viewController.getForgotPassword);
router.get('/users/resetPassword/:token',viewController.getResetPassword);

module.exports = router;
