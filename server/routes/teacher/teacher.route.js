const express = require('express');
const router = express.Router();
const {homeController,
requestController,
studentsController,
profileController,
studentUniListController,
updateProfileController,
addStudentController
// updateStudentUniListController
} = require('../../controllers/teacher/teacher.controller');
const {protect} = require("../../middleware/teacher/teacher.auth");
//page routes
router.route('/home').get(protect,homeController);
router.route('/request').get(protect,requestController);
router.route('/students').get(protect,studentsController);
router.route('/profile/:email').get(protect,profileController);
router.route('/student/:email/uniList').get(protect,studentUniListController);

//curd operations
router.route('/updateProfile/:email').post(protect,updateProfileController);
router.route('addStudent/:email').post(addStudentController);
// router.route('/student:id/uniListUpdate').post(protect,updateStudentUniListController);
module.exports = router