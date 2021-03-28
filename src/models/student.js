const mongoose = require('mongoose');

const Student = mongoose.model('Student', {
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

module.exports = Student