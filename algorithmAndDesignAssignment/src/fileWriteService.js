const fs = require('fs');
const readline = require('readline');

import * as Util from './util';


/**
 * File Write Service to write products to a file .
 */
class FileWriteService {
  constructor(productsArray) {
    this.productsArray = productsArray;
  }

  writeFile() {

    try {
      var file = fs.createWriteStream('invoice.txt');

      file.on('error', function (err) {
        /* error handling */
        console.log(`Error: ${err}`);

        throw Error(err);
      });

      file.write(Util.createRow(null, true));

      let subTotal = 0;
      let valueAddedTax = 0;
      let additionalTax = 0;
      let total = 0;

      this.productsArray.forEach((singleProduct) => {
        subTotal += singleProduct.cost;
        valueAddedTax += singleProduct.valueAddedTax;
        additionalTax += singleProduct.additionalTax;
        total = subTotal + valueAddedTax + additionalTax;
        file.write(Util.createRow(singleProduct, false));
      })


      console.log(`subTotal: ${subTotal}`);

      console.log(`valueAddedTax: ${valueAddedTax}`);

      console.log(`additionalTax: ${additionalTax}`);

      console.log(`Total: ${total}`);


      const NEXT_LINE = '\n';
      file.write(NEXT_LINE);

      file.write("SubTotal: " + subTotal + NEXT_LINE);
      file.write("Value Added Tax: " + valueAddedTax + NEXT_LINE);
      file.write("Additional Tax: " + additionalTax + NEXT_LINE);
      file.write("Total: " + total + NEXT_LINE);

    } catch (fileWriteError) {
      console.error(`Error in writing the file  : ${fileWriteError}`);

      throw new Error(fileWriteError);
    }

  }

}

export default FileWriteService;


