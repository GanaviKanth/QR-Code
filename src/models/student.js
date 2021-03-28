const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    regno: {
        type: String
    },
    sname: {
        type: String
    },
    fname: {
        type: String
    },
    bgroup: {
        type: String
    },
    course: {
        type: String
    },
    dob: {
        type: Date
    },
    address: {
        type: String
    },
    phonenumber: {
        type: Number
    },
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student