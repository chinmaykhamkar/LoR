const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
    },
    lorLink:{
        type:String,
    },
    university:{
        status:{type:Boolean},
        name:{type:String},
        shortform:{type:String,maLength:4}
    }
});

const student = mongoose.model('student',studentSchema);
module.exports = student;