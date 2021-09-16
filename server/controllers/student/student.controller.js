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

// get teachers array

exports.teacherListController = async (req, res, next) => {
    Student.find({ "email": req.params.email })
        .then(student => res.status(200).json({
            sucess: true,
            data: student[0].teachers

        }))
        .catch(err => res.status(400).json('Error ' + err));
}













//get university info
exports.universityController = async (req, res, next) => {
    Student.find({ "email": req.params.email })
        .then(student => res.status(200).json({
            sucess: true,
            data: student[0].university

        }))
        .catch(err => res.status(400).json('Error ' + err));
};

//add universities

exports.addUniversityController = async (req, res, next) => {
    Student.findOne({ "email": req.params.email })
        .then(student => {
            const uobj = { "name": req.body.name, "status": false, "deadline": req.body.deadline, "shortForm": req.body.short };
            student.set(student.university.push(uobj));
            student.save()
                .then(student => {
                    for (let i = 0; i < student['teachers'].length; i++) {
                        Teacher.findOne({ "email": student['teachers'][i].temail })
                            .then(teacher => {
                                const tobj = teacher.students.findIndex(d => d.semail == req.params.email);
                                const uniobj = { "name": req.body.name, "status": false, "deadline": req.body.deadline, "shortForm": req.body.short };
                                teacher.students[tobj]['university'].push(uniobj);
                                teacher.save()
                                // console.log(teacher);
                            })
                            .catch(err => console.log('error inside ' + err));
                    }
                    res.status(200).json({
                        sucess: true,
                        message: 'flag done',
                        data: student
                    })
                })
                .catch(err => console.log('error outside inside ' + err))

        }).catch(err => res.status(400).json('errror outside' + err));

}











// get user info
exports.profileController = async (req, res, next) => {

    Student.find({ "email": req.params.email })
        .then(student => res.status(200).json({
            sucess: true,
            data: student
        }))
        .catch(err => res.status(400).json('Error ' + err));

};


//update user info
exports.updateProfileController = async (req, res, next) => {
    Student.findOne({ "email": req.params.email })
        .then(student => {
            // student.username = req.body.username;
            // student.collegeName = req.body.college;
            // student.lorLink = req.body.lor;
            student.set({ username: req.body.username, collegeName: req.body.college, lorLink: req.body.lor })
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





//create link btw teacher and student

exports.addTeacherController = async (req, res, next) => {
    Teacher.findOne({ "email": req.body.email })
        .then(teacher => {
            const tobj = { "semail": req.body.semail, "name": req.body.name, "status": false };
            // teacher.students = [tobj];
            teacher.set(teacher.students.push(tobj));
            // teacher.students.push(tobj);
            teacher.save()
                .then(teacher => {
                    console.log(teacher.username);
                    Student.findOne({ "email": req.body.semail })
                        .then(student => {
                            const sobj = { "temail": req.body.email, "name": teacher.username, "status": false };
                            // student.teachers = [sobj];
                            student.set(student.teachers.push(sobj));
                            // student.teachers.push(sobj);
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










