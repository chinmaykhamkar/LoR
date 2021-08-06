const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

router.get('/login',teacherController);
router.get('/signup',teacherController);
router.get('/home',teacherController);
router.get('/profile',teacherController);
router.get('/request',teacherController);
router.get('/students',teacherController);
router.get('/student:id/university',teacherController);

module.exports = router;