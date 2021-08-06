const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
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
    code:{
        type:Number,
    },
    students:[{
        status:Boolean,
        name:String}]
    
});

const teacher = mongoose.model('teacher',teacherSchema);
module.exports = teacher;