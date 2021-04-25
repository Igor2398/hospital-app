"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PatientSchema = new Schema({
  id: {
    type: String
  },
  surname: {
    type: String
  },
  name: {
    type: String
  },
  birthDate: {
    type: String,
    "default": Date
  },
  "case": {
    type: String
  },
  inHospital: {
    type: Boolean
  }
}, {
  collection: 'Patients'
});
module.exports = mongoose.model('Patients', PatientSchema, 'Patients');