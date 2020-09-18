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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
function calculateTax(_x) {
  return _calculateTax.apply(this, arguments);
}

function _calculateTax() {
  _calculateTax = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(inputFilePath) {
    var fileReadService, readStream, readInterface, productsArray;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileReadService = new _fileReadService["default"](Constants.VAT, Constants.IMPORTED_TAX, Constants.PRODUCT_TYPES, Constants.PRODUCT_MAPPING);
            _context.prev = 1;
            readStream = fs.createReadStream(inputFilePath);
            readStream.on('error', function (err) {
              console.error("Error in reading the file : ".concat(err));
              throw new Error(err);
            }); // Create File Read Stream.

            readInterface = readline.createInterface({
              input: readStream
            }); // Store the products in array

            productsArray = [];
            _context.next = 8;
            return readInterface.on('line', function (line) {
              var productDocument = fileReadService.readRow(line);

              if (productDocument) {
                productsArray.push(productDocument);
              }
            });

          case 8:
            _context.next = 10;
            return readInterface.on('close', function () {
              var fileWriterService = new _fileWriteService["default"](productsArray);
              console.log("ProductsArray: ".concat(JSON.stringify(productsArray)));
              fileWriterService.writeFile();
            });

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.error("Error : ".concat(_context.t0));
            throw new Error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));
  return _calculateTax.apply(this, arguments);
}