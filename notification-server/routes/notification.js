const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification')

router.get('/notificationApi/sendEmail',notificationController.sendNotification)

module.exports = router