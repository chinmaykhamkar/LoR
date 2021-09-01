const express = require('express');
const router = express.Router();
const {
    homeController,
    teachersController,
    universityController,
    profileController,
    addUniversityController,
    addTeacherController,updateProfileController
} = require('../../controllers/student/student.controller');
//page routes
router.route('/home').get(protect,homeController);
router.route('/teachers').get(protect,teachersController);
router.route('/university').get(protect,universityController);
router.route('/profile').get(protect,profileController);

//curd operations
router.route('/addUniversity').post(protect,addUniversityController);
router.route('/addTeacher').post(protect,addTeacherController);
router.route('/updateProfile').post(protect,updateProfileController);
