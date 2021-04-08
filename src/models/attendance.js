const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    regno: {
        type: String
    },
    present: {
        type: Boolean
    },
    count: {
        type:Number
    }
});
const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance