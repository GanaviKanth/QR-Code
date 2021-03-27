const mongoose = require('mongoose');

const Attendance = mongoose.model('Attendance', {
    regno: {
        type: String
    },
    present: {
        type: Boolean
    },
    // address: {
        // type: String
    // },
    // phonenumber: {
    // type: Number
    // },
    // class: {
    // type: Number
    // },
})
// const stu = new Student({
// name: 'Ganavi',
// address: 'Here'
// })

// stu.save().then(() => {
//console.log(stu)
// }).catch((error) => {
// console.log("error", error)
// })
// 
module.exports = Attendance