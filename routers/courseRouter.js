const express = require('express');
const courseController = require('./../controlers/courseController');

const router = express.Router();


router.
 route('/courses').
 get(courseController.getCourses);


 module.exports = router;