const express = require('express');
const passport = require('passport')
const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();
const setResponseHeaders = require('../utils/setHeaders')

router.get('/userSearch',authController.userSearch)

router.post('/register',authController.register)

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login-failure', 
    successRedirect: '/login-success'
  }),authController.postlogin)

router.get('/login-failure',authController.loginFailure)

router.get('/login-success',authController.loginSuccess)


module.exports = router