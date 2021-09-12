const express = require('express');
const router = express.Router();
const {
    homeController,
    teachersController,
    universityController,
    profileController,
    // addUniversityController,
    addTeacherController,
    updateProfileController
} = require('../../controllers/student/student.controller');
const {protect} = require("../../middleware/student/student.auth");

//page routes
router.route('/home').get(protect,homeController);
router.route('/teachers').get(protect,teachersController);
router.route('/university').get(protect,universityController);
router.route('/profile/:email').get(protect,profileController); 

//curd operations
// router.route('/addUniversity').post(protect,addUniversityController);
router.route('/addTeacher').post(protect,addTeacherController);
router.route('/updateProfile/:email').post(protect,updateProfileController);

module.exports = router;