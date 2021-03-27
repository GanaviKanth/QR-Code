const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/qr-generator', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
})

// const Student = mongoose.model('Student', {
    // name: {
        // type: String
    // },
    // address: {
        // type: String
    // },
// })

// const stu = new Student({
    // name: 'Ganavi',
    // address: 'Here'
// })

// stu.save().then(() => {
    // console.log(stu)
// }).catch((error) => {
//    console.log("error", error) 
// })

//module.exports = Student