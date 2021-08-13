const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.role = require('./role.model');
// db.student = require('./students.models');
// db.teacher = require('./teachers.models');
db.refreshToken = require('./refreshtoken.models');
db.ROLES = ["student","teacher"];

modules.exports = db;