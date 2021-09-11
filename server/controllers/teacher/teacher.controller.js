const ErrorResponse = require("../../utils/errorResponse");
const Teacher = require("../../models/teacher/Teacher");
const { Error } = require("mongoose");
exports.homeController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "Home route"
    });
};

exports.requestController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "requestController route"
    });
};
exports.studentsController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "studentsController route"
    });
};

exports.profileController = async (req, res, next) => {
    Teacher.find({ "email": req.params.email })
        .then(teacher => res.status(200).json({
            success: true,
            data: teacher
        }))
        .catch(err => res.status(400).json('Error ' + err));
};

exports.updateProfileController = async (req, res, next) => {
    Teacher.findOneAndUpdate({ "email": req.params.email })
        .then(teacher => {
            teacher.username = req.body.username;
            teacher.collegeName = req.body.college;
            teacher.save()
                .then(teacher = res.status(200).json({
                    success: true,
                    message: 'update success',
                    data: teacher
                }))
                .catch(err => res.status(400).json('error ' + err));
        })
        .catch(err => res.status(400).json('error ' + err));

}
exports.studentUniListController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "studentUniListController route"
    });
};

exports.studentUniListController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "studentUniListController route"
    });
};

exports.addStudentController = async (req,res,next) => {
    Teacher.findOneAndUpdate({"email":req.params.email})
    .then(teacher => {
        const obj = {"status":false,"email":req.body.email,"name":req.body.name};
        teacher.students = [obj];
        teacher.save()
        .then(teacher => res.status(200).json({
            success:true,
            message:'update sucess',
            data:teacher
        }))
        .catch(err => res.status(400).json('error '+err));
    })
    .catch(err => res.status(400).json('error '+err))
}