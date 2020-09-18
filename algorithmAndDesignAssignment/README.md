Algorithm and Design
========================================

Design and Explanation
---------------
1. Starter file is index.js which runs the method to generate invoice file.
2. invoiceGenerator: It calls two fileServices.
3. Takes filePath as input and opens the files stream.  
4. fileReadService reads single line, creates an object with quantity, price,
name, additionalTax, vat attributes 
5. invoiceGenerator collects these into productArray and pass this array to 
fileWriteService which finally writes it into invoice.txt file. 
6. If there are bad entries in the file, like @ is missing or the product or quantity is 
not a number, that row is skipped and the error is logged. 
7. But the remaining rows continue without stopping the process. 



Instructions to build
---------------

```sh

1. Clone repo    
`https://github.com/shivamsk/company-product-api.git `    

2. Change directory    
`cd algorithmAndDesignAssignment`    

3. Transpile es6 to es5 using babel and run the transpiled file.
`npm run dev`    
Takes the default resources/successSample.txt and writes the result to invoice.txt file 
   
```

Testing
---------------
1. Add new sample file <new_fileName.txt> in resources/
2. Modify fileName in index.js to <new_fileName.txt> 
3. npm run dev 
4. This tests with the new file and gives the output file. 