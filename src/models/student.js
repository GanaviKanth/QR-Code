const mongoose = require('mongoose');

const Student = mongoose.model('Student', {
    regno: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
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
module.exports = Student