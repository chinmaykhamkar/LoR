const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
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
    university:[{status:Boolean,
        name:String,
        shortForm:{type:String,maxlength:4}
    }]
        
    
});

const student = mongoose.model('student',studentSchema);
module.exports = student;