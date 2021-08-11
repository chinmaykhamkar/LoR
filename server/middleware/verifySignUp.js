const db = require('../models');
const Student = db.student;
const Teacher = db.Teacher;
//student
checkDuplicateUsernameOrEmailStudent = (req,res,next) => {
    //username
    Student.findOne({
        username = req.body.username
    }).exce((err,user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message:"Falied! Username already in use"});
            return;
        }
        //email

        Student.findOne({
            email:req.body.email
        }).exce((err,user) => {
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:"Failed! Email already in use!"});
                return;
            }
            next();
        });
    });

};


//teacher
checkDuplicateUsernameOrEmailTeacher = (req,res,next) => {
    //username
    Teacher.findOne({
        username = req.body.username
    }).exce((err,user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message:"Falied! Username already in use"});
            return;
        }
        //email

        Teacher.findOne({
            email:req.body.email
        }).exce((err,user) => {
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:"Failed! Email already in use!"});
                return;
            }
            next();
        });
    });

};

const verifySignUp = {
    checkDuplicateUsernameOrEmailStudent,
    checkDuplicateUsernameOrEmailTeacher
};
module.exports = verifySignUp;