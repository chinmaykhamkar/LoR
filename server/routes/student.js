const express = require('express');
const router = express.Router();
const getStudent = require('../controllers/student');

    router.get('/login',getStudent);
    router.get('/signup',getStudent);
    router.get('/home',getStudent);
    router.get('/teachers',getStudent);
    router.get('/university',getStudent);
    router.get('/profile',getStudent);


module.exports = router; 