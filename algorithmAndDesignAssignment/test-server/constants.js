"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productMapping = exports.productTypes = exports.IMPORTED_TAX = exports.VAT = void 0;
var VAT = 12.5;
exports.VAT = VAT;
var IMPORTED_TAX = 2.4;
exports.IMPORTED_TAX = IMPORTED_TAX;
var productTypes = {
  1: "FOOD",
  2: "TOYS",
  3: "MEDICINES"
};
exports.productTypes = productTypes;
var productMapping = {
  potato: 1,
  soap: 0,
  music: 0,
  perfume: 0,
  crocin: 3,
  teddy: 2,
  handbag: 0,
  sunglasses: 0,
  chocolates: 1
};
exports.productMapping = productMapping;