const crypto = require('crypto');
const ErrorResponse = require("../../utils/errorResponse");
const Student = require("../../models/student/Student");
const sendEmail = require("../../utils/sendEmail.js")
//login controller
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }
    try {
        const student = await Student.findOne({ email }).select("+password");
        if (!student) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await student.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid password", 401));
        }

        sendToken(student, 200, res);
    } catch (err) {
        next(err);
    }
};

//signup controller
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const student = await Student.create({
            username,
            email,
            password
        });

        sendToken(student, 200, res);
    } catch (err) {
        next(err);
    }
};

//forget password controller

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return next(new ErrorResponse("No Email could be sent", 404));
        }

        const resetToken = student.getResetPasswordToken();
        await student.save();
        const resetUrl = `http://localhost:3000/student/passwordreset/${resetToken}`;
        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await sendEmail({
                to: student.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ sucess: true, data: "Email sent" });
        } catch (err) {
            console.log(err);
            student.resetPasswordToken = undefined;
            student.resetPasswordExpire = undefined;
            await student.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }

    } catch (err) {
        next(err);
    }
};

//reset password

exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const student = await Student.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        });

        if (!student) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        student.password = req.body.password;
        student.resetPasswordToken = undefined;
        student.resetPasswordExpire = undefined;

        await student.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: student.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (student, statusCode, res) => {
    const token = student.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token,data:student });
  };
