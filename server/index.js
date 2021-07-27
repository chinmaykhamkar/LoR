
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoute = require('./routes/student');
const teacherRoute = require('./routes/teacher');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
 

//mongo connection
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT,()=> 
console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));
mongoose.set('useFindAndModify',false);

//routes 
app.use('/student',studentRoute);
app.use('/teacher',teacherRoute);