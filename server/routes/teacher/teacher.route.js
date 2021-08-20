const express = require('express');
const { route, post } = require('./auth.route');
const router = express.Router();

//page routes
router.route('/home').get(protect,homeController);
router.route('/request').get(protect,requestController);
router.route('/students').get(protect,studentsController);
router.route('/profile').get(protect,profileController);
router.route('/student:id/uniList').get(protect,studentUniListController);

//curd operations
router.route('/updateProfile').post(protect,updateProfileController);
route.apply.route('/student:id/uniListUpdate').post(protect,updateStudentUniListController);