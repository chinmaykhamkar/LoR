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








//display student list 

exports.studentsController = async (req, res, next) => {
    Teacher.find({ "email": req.params.email })
        .then(teacher => res.status(200).json({
            success: true,
            data: teacher[0].students
        }))
}

//display student uni list teacher

exports.studentUniListController = async (req, res, next) => {
    Teacher.findOne({ "email": req.params.email })
        .then(teacher => {
            
            const sobj = teacher.students.findIndex((f => f.semail == req.params.semail));
            console.log(teacher.students[sobj]);
            
            res.status(200).json({
                sucess: true,
                message: 'flag done',
                data: teacher.students[sobj], 
                

            })
        })
        .catch(err => res.status(400).json('errror ' + err));

};


exports.studentLorController = async (req,res,next) => {
    Student.find({ "email": req.params.email })
        .then(student => res.status(200).json({
            success: true,
            data: student[0].lorLink
        }))
        .catch(err => res.status(400).json('Error ' + err));
}


// update uni status 
// exports.updateStudentUniListController = async (req, res, next) => {
//     Teacher.findOne({ "email": req.params.email })
//         .then(teacher => {
//             const tobj = teacher.students.findIndex((f => f.semail == req.body.semail));
//             for (let i = 0; i < teacher.students[tobj].university.length; i++) {
//                 if (req.body.id == teacher.students[tobj].university[i]._id && teacher.students[tobj].university[i].status == false) {
//                     console.log(teacher.students[tobj].university[i]);
//                     teacher.students[tobj].university[i].status = true;
//                 }
//             }
//             teacher.save()
//                 .then(teacher => {
//                     Student.findOne({ "email": req.body.semail })
//                         .then(student => {
//                             const suobj = student.university.findIndex((s => s._id == req.body.sid));
//                             console.log(student.univeristy[suobj]);

//                         })
//                         .catch(err => res.status(400).json('errror inside' + err));
//                         res.status(200).json({
//                             success: true,
//                             message: 'uni updated',
//                             data: teacher
//                         })
//                 })
//                 .catch(err => res.status(400).json('errror inside outside' + err));
//         })
//         .catch(err => res.status(400).json('errror ' + err));
// }
exports.updateStudentUniListController = async (req, res, next) => {
    Teacher.findOne({ "email": req.params.email })
        .then(teacher => {
            const tuobj = teacher.students.findIndex((f => f.semail == req.body.semail));
            for (let i = 0; i < teacher.students[tuobj].university.length; i++) {
                if (req.body.id == teacher.students[tuobj].university[i]._id && teacher.students[tuobj].university[i].status == false) {
                    teacher.students[tuobj].university[i].status = true;

                }
            }
            teacher.save()
                .then(teacher => res.status(200).json({
                    sucess: true,
                    message: 'flag done',
                    data: teacher
                }))
                .catch(err => res.status(400).json('error ' + err));
        })

        .catch(err => res.status(400).json('errror ' + err));
}


















//profile display
exports.profileController = async (req, res, next) => {
    Teacher.find({ "email": req.params.email })
        .then(teacher => res.status(200).json({
            success: true,
            data: teacher
        }))
        .catch(err => res.status(400).json('Error ' + err));
};

//update profile
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















//accepct student request

exports.acceptRequestController = async (req, res, next) => {
    Student.findOne({ "email": req.body.semail })
        .then(student => {
            const sobj = student.teachers.findIndex((f => f.temail == req.body.temail));
            student.teachers[sobj].status = true;
            student.save()
                .then(student => {
                    Teacher.findOne({ "email": req.body.temail })
                        .then(teacher => {
                            const tobj = teacher.students.findIndex(d => d.semail == req.body.semail);
                            teacher.students[tobj].status = true;
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

























