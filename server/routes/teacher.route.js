const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');
const { authJwt } = require('../middleware');

module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get('/home',[authJwt.veriftToken],teacherController.home);
    router.get('/request',[authJwt.veriftToken],teacherController.request);
    router.get('/student',[authJwt.veriftToken],teacherController.student);
    router.get('/profile',[authJwt.veriftToken],teacherController.profile);
    router.get('/stundent:id/unilist',[authJwt.veriftToken],teacherController.unilist);

};


// router.get('/home',teacherController);
// router.get('/profile',teacherController);
// router.get('/request',teacherController);
// router.get('/students',teacherController);
// router.get('/student:id/university',teacherController);

// module.exports = router;