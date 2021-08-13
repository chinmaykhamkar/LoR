const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name:String,
    username: String,
    email: String,
    password: String,
    collegeName:String,
    lorLink:String,
    university:[{
        status:Boolean,
        name:String,
        shortForm:{type:String,maxlength:4}
    }],
    code:Number,
    students:[{
        status:Boolean,
        name:String
    }],
    roles:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
    
  })
);

module.exports = User;