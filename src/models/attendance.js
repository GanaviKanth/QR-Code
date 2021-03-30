const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    regno: {
        type: String
    },
    present: {
        type: Boolean
    },

});

// address: {
// type: String
// },
// phonenumber: {
// type: Number
// },
// class: {
// type: Number
// },
// const stu = new Student({
// name: 'Ganavi',
// address: 'Here'
// })
const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance