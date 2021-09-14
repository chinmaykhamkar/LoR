const ErrorResponse = require("../../utils/errorResponse");
const Teacher = require("../../models/teacher/Teacher");
const { Error } = require("mongoose");
const Student = require("../../models/student/Student");
exports.homeController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "Home route"
    });
};

//display requested student list
exports.requestController = async (req, res, next) => {
    Teacher.find({ "email": req.params.email })
        .then(teacher => res.status(200).json({
            success: true,
            data: teacher[0].students
        }))
        .catch(err => res.status(400).json('Error ' + err));
};
exports.studentsController = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "studentsController route"
    });
};

//profile display
exports.profileController = async (req, res, next) => {
    Teacher.find({ "email": req.params.email })
        .then(teacher => res.status(200).json({
            success: true,
            data: teacher
        }))
        .catch(err => res.status(400).json('Error ' + err));
};

//update prile
exports.updateProfileController = async (req, res, next) => {
    Teacher.findOne({ "email": req.params.email })
        .then(teacher => {
            // teacher.username = req.body.username;
            // teacher.collegeName = req.body.college;        
            teacher.set({ username: req.body.username, collegeName: req.body.college });
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

//accepct student request

exports.acceptRequestController = async (req, res, next) => {
    Student.findOne({ "email": req.body.semail })
        .then(student => {
            const sobj = student.teachers.findIndex((f => f.temail == req.body.temail));
            // console.log(sobj);
            student.teachers[sobj].status = true;
            // console.log(student.teachers[sobj]);
            student.save()
                .then(student => {
                    Teacher.findOne({ "email": req.body.temail })
                        .then(teacher => {
                            const tobj = teacher.students.findIndex(d => d.semail == req.body.semail);
                            // console.log(tobj);
                            teacher.students[tobj].status = true;
                            // console.log(teacher.students[tobj]);
                            teacher.save();
                        })
                        .catch(err => console.log('error inside ' + err));
                    res.status(200).json({
                        sucess: true,
                        message: 'flag done',
                        data: student.teachers
                    })

                })
                .catch(err => console.log(err));
        }).catch(err => res.status(400).json('errror ' + err));
}

//reject student requet

exports.rejectRequestController = async (req, res, next) => {
    Student.findOne({ "email": req.body.semail })
        .then(student => {
            const sobj = student.teachers.findIndex((f => f.temail == req.body.temail));
            console.log(sobj);
            student.teachers.splice(student.teachers[sobj], 1);
            console.log(student.teachers);
            student.save()
                .then(student => {
                    Teacher.findOne({ "email": req.body.temail })
                        .then(teacher => {
                            const tobj = teacher.students.findIndex(d => d.semail == req.body.semail);
                            teacher.students.splice(teacher.students[tobj], 1);
                            console.log(teacher.students);
                            teacher.save();
                        })
                        .catch(err => console.log('error inside ' + err));
                    res.status(200).json({
                        sucess: true,
                        message: 'delete success',
                        data: student.teachers
                    })

                })
                .catch(err => console.log(err));
        }).catch(err => res.status(400).json('errror ' + err));
}



