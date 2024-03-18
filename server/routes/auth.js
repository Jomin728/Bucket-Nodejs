const express = require('express');
const passport = require('passport')
const authController = require('../controllers/auth');
const fileController = require('../controllers/upload')
const shareController = require('../controllers/share')
const User = require('../models/user');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const setResponseHeaders = require('../utils/setHeaders')

router.post('/api/logout',authController.logout)

router.get('/api/userSearch',authController.userSearch)

router.post('/api/register',authController.register)

router.get('/api/route-guard',authController.checkAuth)

router.post('/api/login', passport.authenticate('local', { 
    failureRedirect: '/api/login-failure', 
    successRedirect: '/api/login-success'
  }),authController.postlogin)

router.get('/api/login-failure',authController.loginFailure)

router.get('/api/login-success',authController.loginSuccess)

router.post('/api/file-upload',upload.any(),fileController.userFileUpload)

router.get('/api/file-details',fileController.getUserFileData)

router.get('/api/file-download',fileController.userFileDownload)

router.get('/api/user-info',authController.getUserInfo)

router.post('/api/share-file',shareController.shareFile)

router.get('/api/sharedfile-details',shareController.getSharedFiledetails)

router.get('/api/imagefile-data',shareController.getImageData)

router.get('/api/file-search',fileController.searchFiles)


module.exports = router