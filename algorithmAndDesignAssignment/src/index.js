import '@babel/polyfill';

const path = require('path');

import {calculateTax} from './invoiceGenerator';


const fileName = 'errorSample.txt';

calculateTax(path.join(__dirname, '..', 'resources', fileName));
