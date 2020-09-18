"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateTax = calculateTax;

var _fileReadService = _interopRequireDefault(require("./fileReadService"));

var _fileWriteService = _interopRequireDefault(require("./fileWriteService"));

var Constants = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fs = require('fs');

var readline = require('readline');

/**
 * Calculates Tax.
 * Implementation of the calculateTax is at the bottom of this file.
 */

/**
 * CalculatesTax from the given input file.
 * @param inputFilePath
 * @returns {Promise.<void>}
 */
function calculateTax(inputFilePath) {
  var fileReadService = new _fileReadService["default"](Constants.VAT, Constants.IMPORTED_TAX, Constants.PRODUCT_TYPES, Constants.PRODUCT_MAPPING);

  try {
    var readStream = fs.createReadStream(inputFilePath);
    readStream.on('error', function (err) {
      console.error("Error in reading the file : ".concat(err));
      throw new Error(err);
    }); // Create File Read Stream.

    var readInterface = readline.createInterface({
      input: readStream
    }); // Store the products in array

    var productsArray = [];
    readInterface.on('line', function (line) {
      var productDocument = fileReadService.readRow(line);

      if (productDocument) {
        productsArray.push(productDocument);
      }
    }); // readline emits a close event when the file is read.

    readInterface.on('close', function () {
      var fileWriterService = new _fileWriteService["default"](productsArray);
      console.log("ProductsArray: ".concat(JSON.stringify(productsArray)));
      fileWriterService.writeFile();
    });
  } catch (err) {
    console.error("Error : ".concat(err));
    throw new Error(err);
  }
}