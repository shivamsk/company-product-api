"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRow = createRow;
exports.createSpaceString = createSpaceString;

/**
 * Util class to create row in file
 */
var SEPARATOR = ' | ';
var NEXT_LINE = '\n';

function createRow(productDocument, isHeader) {
  if (isHeader) {
    var header = 'NAME' + createSpaceString(50 - 'NAME'.length) + SEPARATOR + 'QTY' + SEPARATOR + 'UNIT_COST' + SEPARATOR + 'COST' + NEXT_LINE;
    return header;
  }

  var row = productDocument.product + createSpaceString(50 - productDocument.product.length) + SEPARATOR + productDocument.quantity + SEPARATOR + productDocument.unitCost + SEPARATOR + productDocument.cost + NEXT_LINE;
  return row;
}

function createSpaceString(noOfSpaces) {
  var spaceString = '';

  for (var i = 0; i < noOfSpaces; i++) {
    spaceString += ' ';
  }

  return spaceString;
}