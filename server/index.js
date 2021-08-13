
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.routes');
const db = require('./models');
const Role = db.role;
// const studentRoute = require('./routes/student.route');
// const teacherRoute = require('./routes/teacher.route');
// const studentAuthRoute = require('./routes/auth/auth.students.route');
// const teacherAuthRoute = require('./routes/auth/auth.teacher.route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


//mongo connection
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () => {
    console.log(`Connection is established and running on port: ${PORT}`);
    initial();
}).catch((err) => console.log(err.message));
mongoose.set('useFindAndModify', false);

//routes 
// app.use('/student', studentRoute);
// app.use('/teacher', teacherRoute);
// app.use('/student/auth', studentAuthRoute);
// app.use('teacher/auth', teacherAuthRoute);
app.use('/user', userRoute);
app.use('/user/auth', authRoute);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "student"
            }).save(err => {
                if (err) {
                    console.log("error ", err);
                }
                console.log("added student to role collection");
            });

            new Role({
                name: "teacher"
            }).save(err => {
                if (err) {
                    console.log("error ", err);
                }
                console.log("added teacher to role collection");
            });

        }
    });
}