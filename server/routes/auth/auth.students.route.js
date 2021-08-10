const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/auth/auth.student.controller");
const express = require('express');
const router = express.Router();

module.exports = function (router) {
    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
        ],
        controller.signup
    );
    router.post("/signin", controller.signin);
    router.post("/refreshtoken", controller.refreshToken);
};

