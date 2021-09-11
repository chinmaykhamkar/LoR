const ErrorResponse = require("../../utils/errorResponse");
const Student = require("../../models/student/Student");
const Teacher = require("../../models/teacher/Teacher")
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
    Teacher.findOneAndUpdate({ "email": req.body.email })
        .then(teacher => {
            const tobj = { "email": req.params.email, "name": req.body.name, "status": false };
            teacher.students = [tobj];
            teacher.save()
                .then(teacher => {
                    console.log(teacher.username);
                    Student.findOneAndUpdate({ "email": req.params.email })
                        .then(student => {
                            const sobj = { "email": req.body.email, "name": teacher.username, "status": false };
                            student.teachers = [sobj];
                            student.save()
                                .then(student => console.log(student))
                                .catch(err => console.log('error inside inside ' + err));

                        })
                        .catch(err => console.log('error insde ' + err));
                    res.status(200).json({
                        sucess: true,
                        message: 'update done',
                        data: teacher
                    })
                })
                .catch(err => res.status(400).json('error outside inside ' + err));

        })
        .catch(err => res.status(400).json('error outside ' + err));
}












// var tname;
// exports.addTeacherController = async (req, res, next) => {
//     Student.findOneAndUpdate({ "email": req.params.email })
//         .then(student => {
//             const sobj = { "email": req.body.email, "name": tname, "status": false };
//             student.teachers = [sobj];
//             student.save()
//                 .then(student => res.status(200).json({
//                     sucess: true,
//                     message: 'update sucess',
//                     data: student
//                 }))
//                 .catch(err => res.status(400).json('error ' + err));
//         })
//         .catch(err => res.status(400).json('error ' + err));

// }