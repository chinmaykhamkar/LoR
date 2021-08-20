const express = require('express');
const { route, post } = require('./auth.route');
const router = express.Router();

//page routes
router.route('/home').get(protect,homeController);
router.route('/teachers').get(protect,teachersController);
router.route('/university').get(protect,universityController);
router.route('/profile').get(protect,profileController);

//curd operations
router.route('/addUniversity').post(protect,addUniversityController);
router.route('/addTeacher').post(protect,addTeacherController);
router.route('/updateProfile').post(protect,updateProfileController);
