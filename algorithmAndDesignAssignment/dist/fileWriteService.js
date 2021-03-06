"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Util = _interopRequireWildcard(require("./util"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require('fs');

var readline = require('readline');

/**
 * File Write Service to write products to a file .
 */
var FileWriteService = /*#__PURE__*/function () {
  function FileWriteService(productsArray) {
    _classCallCheck(this, FileWriteService);

    this.productsArray = productsArray;
  }

  _createClass(FileWriteService, [{
    key: "writeFile",
    value: function writeFile() {
      try {
        var file = fs.createWriteStream('invoice.txt');
        file.on('error', function (err) {
          /* error handling */
          console.log("Error: ".concat(err));
          throw Error(err);
        });
        file.write(Util.createRow(null, true));
        var subTotal = 0;
        var valueAddedTax = 0;
        var additionalTax = 0;
        var total = 0;
        this.productsArray.forEach(function (singleProduct) {
          subTotal += singleProduct.cost;
          valueAddedTax += singleProduct.valueAddedTax;
          additionalTax += singleProduct.additionalTax;
          total = subTotal + valueAddedTax + additionalTax;
          file.write(Util.createRow(singleProduct, false));
        });
        console.log("subTotal: ".concat(subTotal));
        console.log("valueAddedTax: ".concat(valueAddedTax));
        console.log("additionalTax: ".concat(additionalTax));
        console.log("Total: ".concat(total));
        var NEXT_LINE = '\n';
        file.write(NEXT_LINE);
        file.write("SubTotal: " + subTotal + NEXT_LINE);
        file.write("Value Added Tax: " + valueAddedTax + NEXT_LINE);
        file.write("Additional Tax: " + additionalTax + NEXT_LINE);
        file.write("Total: " + total + NEXT_LINE);
      } catch (fileWriteError) {
        console.error("Error in writing the file  : ".concat(fileWriteError));
        throw new Error(fileWriteError);
      }
    }
  }]);

  return FileWriteService;
}();

var _default = FileWriteService;
exports["default"] = _default;