const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const QRCode = require('qrcode');
const fs = require('fs');
require('./src/db/mongoose');
const Student = require('./src/models/student')
const Attendance = require('./src/models/attendance')
var qr = require('qr-image');
const { version } = require('os');

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set('views', path.join(__dirname, 'html'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
//app.set('views', '/index');

app.use('/', routes);

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
console.log("Data saved");

app.post('', async function (req, res) {
    console.log(req.body)

    stringData = JSON.stringify(req.body);
    regno = req.body.regno;
    sname = req.body.sname;
    fname = req.body.fname;
    bgroup = req.body.bgroup;
    course = req.body.course;
    dob = req.body.dob;
    address = req.body.address;
    phonenumber = req.body.phonenumber;

    const st = new Student({
        regno: regno,
        sname: sname,
        fname: fname,
        bgroup: bgroup,
        course: course,
        dob: dob,
        address: address,
        phonenumber: phonenumber,
    });
    st.save().then(() => {
        console.log(st)
    }).catch((error) => {
        console.log("error", error)
    });

    const att = new Attendance({
        register_no: regno,
        present: false
    });
    att.save().then(() => {
        // console.log(att)
    }).catch((error) => {
        console.log("error", error)
    });

    QRCode.toFile('./qrImage.png', stringData, { version: 10 });

    res.render('success in saving the file');
});

app.get('/list.ejs', (req, res) => {
    //retrieve from mongoose and print list
    const studentList = Student.find({})
    studentList.forEach(function printStudents(item,index) {
        console.log(item + " => at index " + index)
    })
    res.render('list');
})

app.listen(3000);

