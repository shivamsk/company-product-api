/**
 * File Read Service to read each row and create a document .
 */
class FileReadService {
  constructor(vat, importedTax, productTypes, productMapping) {
    this.vat = vat;
    this.importedTax = importedTax;
    this.productTypes = productTypes;
    this.productMapping = productMapping;
  }

  readRow(line) {

    try {
      console.log(`Line: ${line}`);

      // Split by @
      const splitByRate = line.split(' @ ');
      console.log(`splitByRate: ${splitByRate}`);

      if (splitByRate && splitByRate.length == 1) {
        throw new Error('@ is missing from line');
      }
      const price = parseFloat(splitByRate[1].trim());

      if (isNaN(price)) {
        throw new Error('Invalid Price');
      }

      const splitBySpaces = splitByRate[0].split(' ');
      console.log(`splitBySpaces: ${splitBySpaces}`);


      const quantity = parseInt(splitBySpaces[0].trim());
      if (isNaN(quantity)) {
        throw new Error('Invalid quantity format');

      }

      if (splitBySpaces && splitBySpaces.length == 1) {
        throw new Error('Invalid product name');

      }

      const productNames = splitBySpaces.splice(1);
      let valueAddedTax = 0.0;
      let additionalTax = 0.0;

      console.log("this.productMapping "+ this.productMapping);
      let mappingExists = false;
      for (let productName of productNames) {
        if (productName in this.productMapping) {

          const productType = this.productMapping[productName];

          if (!(productType in this.productTypes)) {
            valueAddedTax = quantity * price * (this.vat * 0.01);
          }
          mappingExists = true;

        }

        if (productName.toLowerCase() === 'imported') {
          additionalTax = quantity * price * (this.importedTax * 0.01);
        }
      }

      const product = productNames.join(' ');

      if (!mappingExists) {
        valueAddedTax = quantity * price * (this.vat * 0.01);
      }

      const result = {
        product: product,
        quantity: quantity,
        unitCost: price,
        cost: price * quantity,
        valueAddedTax: valueAddedTax,
        additionalTax: additionalTax
      };
      console.log(`Result Row: ${JSON.stringify(result)}`);

      return result;

    } catch (err) {
      console.error(`Error in reading the row  : ${err}`);

      return null;
      // throw new Error(err);
    }
  }

}

export default FileReadService;


