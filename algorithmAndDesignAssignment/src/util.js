/**
 * Util class to create row in file
 */


const SEPARATOR = ' | ';
const NEXT_LINE = '\n';


export function createRow(productDocument, isHeader) {
  if (isHeader) {
    let header = 'NAME'+ createSpaceString(50 - 'NAME'.length) + SEPARATOR +
        'QTY' + SEPARATOR + 'UNIT_COST' + SEPARATOR + 'COST' + NEXT_LINE;
    return header;
  }

  let row = productDocument.product +
      createSpaceString(50 - productDocument.product.length) + SEPARATOR +
      productDocument.quantity
      + SEPARATOR + productDocument.unitCost + SEPARATOR + productDocument.cost
      + NEXT_LINE;
  return row;

}


export function createSpaceString(noOfSpaces) {
  let spaceString = '';
  for (let i = 0; i < noOfSpaces; i++) {
    spaceString += ' ';
  }

  return spaceString;
}
