const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

    router.get('/login',studentController);
    router.get('/signup',studentController);
    router.get('/home',studentController);
    router.get('/teachers',studentController);
    router.get('/university',studentController);
    router.get('/profile',studentController);


module.exports = router; 