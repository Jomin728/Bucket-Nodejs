const express = require('express');
const passport = require('passport')
const authController = require('../controllers/auth');
const fileController = require('../controllers/upload')
const User = require('../models/user');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const setResponseHeaders = require('../utils/setHeaders')

router.get('/userSearch',authController.userSearch)

router.post('/register',authController.register)

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login-failure', 
    successRedirect: '/login-success'
  }),authController.postlogin)

router.get('/login-failure',authController.loginFailure)

router.get('/login-success',authController.loginSuccess)

router.post('/fileUpload',upload.any(),fileController.userFileUpload)


module.exports = router