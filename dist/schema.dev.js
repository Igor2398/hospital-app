"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Patient = new Schema({
  surname: {
    type: String,
    required: true
  },
  howOld: {
    type: Number,
    required: true
  },
  stillInHospital: {
    type: Boolean,
    required: true
  }
});
module.exports = mongoose.model('Patients', Patient);