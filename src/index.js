var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
const QRCode = require('qrcode');
const fs = require('fs');
require('./db/mongoose');
const Student = require('./models/student')
const Attendance = require('./models/attendance')
var qr = require('qr-image');
const { version } = require('os');

app.get('/', function (req, res) {
    res.render('form');
});

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views', './src');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
console.log("Data saved");

app.post('/', function (req, res) {
    //console.log(req.body)

    stringData = JSON.stringify(req.body);
    regno = req.body.regno;
    name = req.body.name;
    address = req.body.address;

    const st = new Student({
        regno: regno,
        name: name,
        address: address
    });
    st.save().then(() => {
        //console.log(st)
    }).catch((error) => {
        console.log("error", error)
    });

    const att = new Attendance({
        regno: regno,
        present: false
    });
    att.save().then(() => {
        // console.log(att)
    }).catch((error) => {
        console.log("error", error)
    });

    QRCode.toFile('./qrImage.png', stringData, { version: 6 });

    res.send("recieved your request!");
});

app.get('/qr-generater/Collections/students', (req, res) => {
    console.log("hey");
    console.log(req.body);
    console.log(res.body);
    console.log(db.collection('students').find({ name: 'Ganavi' }));
    console.log(Student.find({ name: 'Ganavi' }));
    Student.find({}).then((students) => {
        console.log(students)
        //console.log('heyy')
    }).catch((e) => {
        console.log(e)
    })
})

app.listen(3000);