const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //student routes
  app.get("/student/home", [authJwt.verifyToken], controller.studentHome);
  app.get("/student/teacher", [authJwt.verifyToken], controller.studentTeacher);
  app.get("/student/university", [authJwt.verifyToken], controller.studentUniveristy);
  app.get("/student/profile", [authJwt.verifyToken], controller.studentProfile);

  //teacher routes
  app.get("/teacher/home", [authJwt.verifyToken, authJwt.isTeacher], controller.teacherHome);
  app.get("/teacher/request", [authJwt.verifyToken, authJwt.isTeacher], controller.teacherRequest);
  app.get("/teacher/proifle", [authJwt.verifyToken, authJwt.isTeacher], controller.teacherProfile);
  app.get("/teacher/studentList", [authJwt.verifyToken, authJwt.isTeacher], controller.teacherStudentList);
  app.get("/teacher/student:id/unilist", [authJwt.verifyToken, authJwt.isTeacher], controller.teacherUnilist);

};