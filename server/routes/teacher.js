const express = require('express');
const router = express.Router();
const getTeacher = require('../controllers/teacher');

router.get('/login',getTeacher);
router.get('/signup',getTeacher);
router.get('/home',getTeacher);
router.get('/profile',getTeacher);
router.get('/request',getTeacher);
router.get('/students',getTeacher);
router.get('/student:id/university',getTeacher);

module.exports = router;