const express = require('express');
const router = express.Router();
const {homeController,
requestController,
studentsController,
profileController,
studentUniListController,
updateProfileController,
acceptRequestController,
rejectRequestController,
updateStudentUniListController,
// addStudentController
} = require('../../controllers/teacher/teacher.controller');
const {protect} = require("../../middleware/teacher/teacher.auth");
//page routes
router.route('/home').get(protect,homeController);
router.route('/request/:email').get(protect,requestController);
router.route('/students/:email').get(protect,studentsController);
router.route('/profile/:email').get(protect,profileController);
router.route('/student/uniList/:email/:semail').get(protect,studentUniListController);


//curd operations
router.route('/updateProfile/:email').post(protect,updateProfileController);
router.route('/acceptRequest').post(protect,acceptRequestController);
router.route('/rejectRequest').post(protect,rejectRequestController);
router.route('/uniListUpdate/:email').post(protect,updateStudentUniListController)

// router.route('addStudent/:email').post(protect,addStudentController);
// router.route('/student:id/uniListUpdate').post(protect,updateStudentUniListController);
module.exports = router