"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * File Read Service to read each row and create a document .
 */
var FileReadService = /*#__PURE__*/function () {
  function FileReadService(vat, importedTax, productTypes, productMapping) {
    _classCallCheck(this, FileReadService);

    this.vat = vat;
    this.importedTax = importedTax;
    this.productTypes = productTypes;
    this.productMapping = productMapping;
  }

  _createClass(FileReadService, [{
    key: "readRow",
    value: function readRow(line) {
      try {
        console.log("Line: ".concat(line)); // Split by @

        var splitByRate = line.split(' @ ');
        console.log("splitByRate: ".concat(splitByRate));

        if (splitByRate && splitByRate.length == 1) {
          throw new Error('@ is missing from line');
        }

        var price = parseFloat(splitByRate[1].trim());

        if (isNaN(price)) {
          throw new Error('Invalid Price');
        }

        var splitBySpaces = splitByRate[0].split(' ');
        console.log("splitBySpaces: ".concat(splitBySpaces));
        var quantity = parseInt(splitBySpaces[0].trim());

        if (isNaN(quantity)) {
          throw new Error('Invalid quantity format');
        }

        if (splitBySpaces && splitBySpaces.length == 1) {
          throw new Error('Invalid product name');
        }

        var productNames = splitBySpaces.splice(1);
        var valueAddedTax = 0.0;
        var additionalTax = 0.0;
        console.log("this.productMapping " + this.productMapping);
        var mappingExists = false;

        var _iterator = _createForOfIteratorHelper(productNames),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var productName = _step.value;

            if (productName in this.productMapping) {
              var productType = this.productMapping[productName];

              if (!(productType in this.productTypes)) {
                valueAddedTax = quantity * price * (this.vat * 0.01);
              }

              mappingExists = true;
            }

            if (productName.toLowerCase() === 'imported') {
              additionalTax = quantity * price * (this.importedTax * 0.01);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var product = productNames.join(' ');

        if (!mappingExists) {
          valueAddedTax = quantity * price * (this.vat * 0.01);
        }

        var result = {
          product: product,
          quantity: quantity,
          unitCost: price,
          cost: price * quantity,
          valueAddedTax: valueAddedTax,
          additionalTax: additionalTax
        };
        console.log("Result Row: ".concat(JSON.stringify(result)));
        return result;
      } catch (err) {
        console.error("Error in reading the row  : ".concat(err));
        return null; // throw new Error(err);
      }
    }
  }]);

  return FileReadService;
}();

var _default = FileReadService;
exports["default"] = _default;