const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authJwt } = require('../middleware');

module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get('/home',[authJwt.veriftToken],studentController.home);
    router.get('/teachers',[authJwt.veriftToken],studentController.teachers);
    router.get('/university',[authJwt.veriftToken],studentController.university);
    router.get('/profile',[authJwt.veriftToken],studentController.profile);
};


// router.get('/home', studentController);
// router.get('/teachers', studentController);
// router.get('/university', studentController);
// router.get('/profile', studentController);


// module.exports = router;