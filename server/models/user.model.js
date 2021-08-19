const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   //common
    name:{
        type:String,
      },
    username:{
        type:String,
        unique:true
        
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
    },
    usertype:{
        type:String,
        enum:['student','teacher'],
    },
    //student
    lorLink:{
        type:String,
    },
    university:[{status:Boolean,
        name:String,
        shortForm:{type:String,maxlength:4}
    }],
    teachers:[{
        name:String,
        status:Boolean
    }],
    //teacher
    code:{
        type:Number,
    },
    students:[{
        status:Boolean,
        name:String}]
    
});

const user = mongoose.model('user',UserSchema);
module.exports = user;