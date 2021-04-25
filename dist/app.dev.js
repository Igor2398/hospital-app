"use strict";

var db = require('./db');

var Patient = require('./models/schema');

var uniqid = require('uniqid');

var express = require('express');

var app = express();
port = 5000;
app.set('view engine', 'ejs');
app.use(express["static"]('public'));
app.use(express["static"]('public/css'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.listen(process.env.PORT || port, function () {
  console.log('Server up');
});
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/list', function (req, res) {
  Patient.find({}, function (err, details) {
    if (err) {
      console.log(err);
    } else {
      res.render('list', {
        details: details
      });
    }
  });
});
app.post('/api/add', function (req, res) {
  var newPatient = new Patient();
  newPatient.id = uniqid();
  newPatient.surname = req.body.surname;
  newPatient.name = req.body.name;
  newPatient.birthDate = req.body.birthDate;
  newPatient["case"] = req.body["case"];
  newPatient.inHospital = req.body.inHospital;
  newPatient.save().then(console.log('Added.'))["catch"](function (err) {
    return console.log(err);
  });
  res.redirect('/');
});
app.post('/api/delete', function _callee(req, res) {
  var patientId, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          patientId = req.body.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Patient.deleteOne({
            id: patientId
          }));

        case 3:
          response = _context.sent;
          console.log(response);
          res.redirect('/list');

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/modify', function (req, res) {
  var patient = req.body;
  Patient.find(patient, function (err, details) {
    if (err) {
      console.log(err);
    } else {
      res.render('modify', {
        details: details
      });
    }
  });
});
app.post('/api/modify', function _callee2(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Patient.updateOne({
            id: req.body.id
          }, {
            $set: {
              surname: req.body.surname,
              name: req.body.name,
              birthDate: req.body.birthDate,
              "case": req.body["case"],
              inHospital: req.body.inHospital
            }
          }));

        case 2:
          response = _context2.sent;
          res.redirect('/list');

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});