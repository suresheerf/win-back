const express = require('express');
const multer = require('multer');
const userController = require('./../controlers/userController');
const authController = require('./../controlers/authController');
const router = express.Router();

const upload = multer({dest:'public/img/users'});

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword',authController.protect,authController.updatePassword);

router.patch('/updateMe',authController.protect,upload.single('img'),userController.updateMe);
router.delete('/deleteMe',authController.protect,userController.deleteMe);


router.
 route('/').
 get(authController.protect ,userController.getUsers).
 post(userController.createUser);


 router.
 route('/:id').
 get(userController.getUser).
 delete(userController.deleteUser).
 patch(userController.updateUser);



 module.exports = router;