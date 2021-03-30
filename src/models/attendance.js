const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    regno: {
        type: String
    },
    present: {
        type: Boolean
    },

});
const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance