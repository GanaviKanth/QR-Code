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
var { check, validationResult } = require('express-validator');
const read = require('./read_qr');
const { count } = require('./src/models/student');

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set('views', path.join(__dirname, 'html'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
//app.set('views', '/index');

app.use('/', routes);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload.array());

app.use(express.static('public'));
app.use(express.static('qr_codes'));
console.log("Data saved");

app.post('/',
    check('regno').isLength(10).withMessage("the length of Register Number Should be 10 of the form 1PE*******"),
    check("regno").custom(value => {
        return Student.find({
            regno: value
        }).then(student => {
            if (student.length > 0) {
                throw ("The USN " + value + " already exists");
            }
        });
    }),
    check('sname').isLength(3).withMessage("minimun length of Student Name should be is 3").matches(/^[A-Za-z\s]+$/).withMessage("The Student Name should contain only alphabets"),
    check('fname').isLength(3).withMessage("minimun length of Father Name should be is 3").matches(/^[A-Za-z\s]+$/).withMessage("The Father Name should contain only alphabets"),
    check('phonenumber').matches(/^\d{10}$/).withMessage("number is Incorrect"),
    check('bgroup').matches(/^(A|B|AB|O)[+-]$/i).withMessage("Please enter correct blood group"),
    check('dob').isDate().withMessage("Enter a valid date"),
    async function (req, res) {
        var err = validationResult(req);
        if (!err.isEmpty()) {
            console.log(err.array())
            res.render('error', { data: err.array() })
        }
        else {
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
                //console.log(st)
            }).catch((error) => {
                console.log("error", error)
            });

            const att = new Attendance({
                regno: regno,
                present: false,
                count: 0,
            });
            att.save().then(() => {
            }).catch((error) => {
                console.log("error", error)
            });

            QRCode.toFile('./qr_codes/qr' + regno + '.png', stringData, { version: 10 });

            res.render('sucess.ejs');
        }
    });

app.get('/list.ejs', (req, res) => {
    Student.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('list', { docs: docs });
        }
    });
})

app.get('/list/:regno', (req, res) => {
    var imgs = "/qr" + req.params.regno + ".png";
    var qr = "./qr_codes/qr" + req.params.regno + ".png";
    read.run(qr);
    var count, pres;
    Attendance.find({ regno: req.params.regno }, 'count present', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            data[0].present = !data[0].present;
            Attendance.updateOne({ regno: req.params.regno }, { count: data[0].count + 1, present: data[0].present }, function (err, data1) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data1)
                }
            })
        }
        count = data[0].count
        if (data[0].present == true) { pres = 'absent' }
        else { pres = 'present' }
    })
    Student.find({ regno: req.params.regno }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('details', { image: imgs, data: data, count: count, present: pres });
        }
    });
})

app.get('/error.ejs', (req, res) => {
    res.render('error');
    res.render('success in saving the file');
});
app.get('/index', (req, res) => {
    res.render('details');
})

app.listen(3000);

