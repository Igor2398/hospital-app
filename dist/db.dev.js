"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv');

dotenv.config();
var connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose.connect(process.env.CONNECTIONSTRING, connectionParams).then(function () {
  console.log("Connected to db!");
})["catch"](function (err) {
  console.log("Error connecting to the database. \n".concat(err));
});