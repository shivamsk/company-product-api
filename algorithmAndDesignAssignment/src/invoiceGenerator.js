const fs = require('fs');
const readline = require('readline');

import FileReadService from './fileReadService';
import FileWriteService from './fileWriteService';
import * as Constants from './constants';


/**
 * Calculates Tax.
 * Implementation of the calculateTax is at the bottom of this file.
 */

/**
 * CalculatesTax from the given input file.
 * @param inputFilePath
 * @returns {Promise.<void>}
 */
export function calculateTax(inputFilePath) {

  const fileReadService = new FileReadService(
      Constants.VAT, Constants.IMPORTED_TAX, Constants.PRODUCT_TYPES, Constants.PRODUCT_MAPPING);

  try {

    var readStream = fs.createReadStream(inputFilePath);
    readStream.on('error', function (err) {
      console.error(`Error in reading the file : ${err}`);
      throw new Error(err);
    });
    // Create File Read Stream.
    const readInterface = readline.createInterface({
      input: readStream,
    });

    // Store the products in array
    let productsArray = [];

    readInterface.on('line', function (line) {
      const productDocument = fileReadService.readRow(line);
      if (productDocument) {
        productsArray.push(productDocument);
      }

    });

    // readline emits a close event when the file is read.
    readInterface.on('close', function () {
      const fileWriterService = new FileWriteService(
          productsArray);

      console.log(`ProductsArray: ${JSON.stringify(productsArray)}`);

      fileWriterService.writeFile();
    });

  } catch (err) {
    console.error(`Error : ${err}`);
    throw new Error(err);
  }

}


