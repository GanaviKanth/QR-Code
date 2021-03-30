const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Request for home recieved');
    res.render('index');
});

router.get('/list', (req, res) => {
    console.log('Request for list page recieved');
    res.render('list');
});

router.get('/success', (req, res) => {
    console.log('success page recieved');
    res.render('sucess');
});

router.get('/error', (req, res) => {
    console.log('error page recieved');
    res.render('error');
});

router.get('/details', (req, res) => {
    console.log('details page recieved');
    res.render('details');

});

module.exports = router;