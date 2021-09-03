const express = require('express');
const notificationController = require('./../controlers/notificationController');
const authController = require('./../controlers/authController');

const Router = express.Router({mergeParams: true});

Router.route('/').
post(notificationController.createNotification).
delete(notificationController.deleteNotification);

module.exports = Router;