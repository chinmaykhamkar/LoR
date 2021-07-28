const express = require('express');
const router = express.Router();
const getStudent = require('../controllers/student');

    router.get('/',getStudent);

module.exports = router; 