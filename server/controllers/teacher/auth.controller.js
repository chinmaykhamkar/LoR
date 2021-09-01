const crypto = require('crypto');
const ErrorResponse = require("../../utils/errorResponse");
const Teacher = require("../../models/teacher/Teacher");


//login controller
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
    }
    try {
        const teacher = await Teacher.findOne({ email }).select("+password");
        if (!teacher) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await teacher.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid password", 401));
        }

        sendToken(teacher, 200, res);
    } catch (err) {
        next(err);
    }
};

//signup controller
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const teacher = await Teacher.create({
            username,
            email,
            password
        });

        sendToken(teacher, 200, res);
    } catch (err) {
        next(err);
    }
};

//forget password controller

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return next(new ErrorResponse("No Email could be sent", 404));
        }

        const resetToken = teacher.getResetPasswordToken();
        await teacher.save();
        const resetUrl = `http://localhost:8000/passwordreset/${resetToken}`;
        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await sendEmail({
                to: teacher.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ sucess: true, data: "Email sent" });
        } catch (err) {
            console.log(err);
            teacher.resetPasswordToken = undefined;
            teacher.resetPasswordExpire = undefined;
            await teacher.save();

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
        const teacher = await Teacher.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!teacher) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        teacher.password = req.body.password;
        teacher.resetPasswordToken = undefined;
        teacher.resetPasswordExpire = undefined;

        await teacher.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: teacher.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (teacher, statusCode, res) => {
    const token = teacher.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };
