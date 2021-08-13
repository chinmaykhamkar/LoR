const config = require('../../config/auth.config');
const db = require('../../models');
const { student: Student, teacher: Teacher, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const student = require('../../models/students.models');

exports.signup = (req, res) => {
    const student = new Student({
        name: req.body.name,
        username: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    username.save((err, student) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Registration successful!" });
    });
};

exports.signin = (req, res) => {
    Student.findOne({
        username: req.body.username,
    })
    if (!student) {
        return res.status(404).send({ message: "Account not found" })
    }
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        student.password
    )
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password",
        });
    }

    let token = jwt.sign({ id: student.id }, config.secret, {
        expiresIn = config.jwtExpiration,
    });

    let refreshToken = await RefreshToken.createToken(student);
    res.send(200).send({
        id=student._id,
        name: student.name,
        username: student.username,
        email: student.email,
        accessToken: token,
        refreshToken: refreshToken

    });

};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        if (!requestToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        
    }
}