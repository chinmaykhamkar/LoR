const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TeacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    collegeName: {
        type: String,
        default:''        
    },
    userType: {
        type: String,
        default: 'teacher'
    },    
    students: [{
        semail: String,
        name:String,
        status: Boolean,
        university:[{
            name:String,
            status:Boolean,
            deadline:Date,
            shortForm:{type:String,maxlength:4}
        }]
        
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
TeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

TeacherSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

TeacherSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

TeacherSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire date
    this.resetPasswordExpire = Date.now() + 600000; // Ten Minutes

    return resetToken;
};
const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;