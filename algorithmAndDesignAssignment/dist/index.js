"use strict";

require("@babel/polyfill");

var _invoiceGenerator = require("./invoiceGenerator");

var path = require('path');

var fileName = 'errorSample.txt';
(0, _invoiceGenerator.calculateTax)(path.join(__dirname, '..', 'resources', fileName));