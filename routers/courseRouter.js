const express = require('express');
const courseController = require('./../controlers/courseController');
const authController = require('./../controlers/authController');
const reviewRouter = require('./reviewRouter');

const router = express.Router();


router.use('/:courseId/reviewa',reviewRouter);

router.
 route('/').
 get(courseController.getCourses).
 post(authController.protect,
       authController.restrictTo('admin'), 
       courseController.createCourse);

 router.
 route('/:id').
 get(courseController.getCourse).
 delete(courseController.deleteCourse).
 patch(courseController.updateCourse);

 module.exports = router;