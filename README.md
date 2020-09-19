company-product-api
========================================
Ecommerce application with the APIs for product,category, user and roles.
This project contains the below modules:   

- [x] HTTP API server using Express
- [x] JWT middleware for authorization
- [x] ES6 support via babel
- [x] MongoDB using Mongoose  

Instructions
---------------

```sh

1. Clone repo    
`https://github.com/shivamsk/company-product-api.git <dir_name>`    

2. Change directory    
`cd company-product-api`    

3. Install packages    
`npm install`    

4. Run Server (Listens on port 5000)
`npm run dev`    

```

Attachments in the Repo
---------------
1. Postman API Collection
2. ER Diagram

Design 
---------------

1. Register User using username, password and role.  
2. AccessToken is generated and can be used for further requests. 
3. ADMIN role User can add Products and do all the other operations. 
4. CUSTOMER role User can only update and view the products.  
5. Each category can have multiple products ( category to products - 1 to many relation)
6. Four entities used are : ROLE, USER,PRODUCT,CATEGORY.
7. ROLE is an embedded object in the USER document. 
8. Basic validations for the product are in place. 
9. Added passportjs for authentication middleware.
10.Added eslint for code style checks. 
11. User entity is used as seller and the external user with the role permissions.
12. Each Seller can have multiple products with the sellerId used in the product.  
13. Used NoSQL Database as the components don't demand any ACID properties and so made use of the NoSQL denormalized structure.    

TODOs and Improvements 
---------------
1. Setup the prod configuration and add docker image. 
2. Setup webpack configuration.
3. Add Joi validation at each entity level
4. Add createdAt,updatedAt,createdBy, updatedBy fields for all entities.
5. Add DTOs for each entityType. 
6. Add Flow for type checks. 
7. Need to improve linting and add more rules in eslint.
8. Add code level comments and API documentation using swagger 

 
