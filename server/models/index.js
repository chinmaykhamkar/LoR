const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.student = require('./students.models');
db.teacher = require('./teachers.models');
db.refreshToken = require('./refreshtoken.models');

modules.exports = db;