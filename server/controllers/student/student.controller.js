const ErrorResponse = require("../../utils/errorResponse");
const Student = require("../../models/student/Student");
const { Error } = require("mongoose");

exports.homeController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "Home route"
    });
};

exports.teachersController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "teacher route"
    });
};
exports.universityController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "universityController route"
    });
};
exports.profileController = async (req, res, next) => {

    Student.find({ "email": req.params.email })
        .then(student => res.status(200).json({
            sucess: true,
            data: student
        }))
        .catch(err => res.status(400).json('Error ' + err));

};

exports.updateProfileController = async (req, res, next) => {
    Student.findOneAndUpdate({ "email": req.params.email })
        .then(student => {
            student.username = req.body.username;
            student.collegeName = req.body.college;
            student.lorLink = req.body.lor;
            student.save()
                .then(student => res.status(200).json({
                    sucess: true,
                    message: 'update sucess',
                    data: student
                }))
                .catch(err => res.status(400).json('error ' + err));
        })
        .catch(err => res.status(400).json('error ' + err));

}

exports.addTeacherController = async (req, res, next) => {

    Student.findOneAndUpdate({ "email": req.params.email })
        .then(student => {
            const obj = {"email":req.body.email,"name":"","status":false};
            student.teachers = [obj];
            student.save()
                .then(student => res.status(200).json({
                    sucess: true,
                    message: 'update sucess',
                    data: student
                }))
                .catch(err => res.status(400).json('error ' + err));
        })
        .catch(err => res.status(400).json('error ' + err));

}