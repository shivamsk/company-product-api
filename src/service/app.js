import express from 'express';
import middlewareLogging from './middleware/middleware-logger';
import middlewarePassport from './middleware/middleware-passport';
import middlewareRequestParser from './middleware/middleware-request-parser';

//  Common components
import ModelOfTRepository from '../data/repositories/modelOfTRepository';
// import middlewareCors from './middleware/middleware-cors';

// User
import UserModel from '../data/models/userModel';
import UserController from '../service/controllers/userController';
import UserRouter from '../service/routes/userRouter';

// Product
import ProductModel from '../data/models/productModel';
import ProductController from '../service/controllers/productController';
import ProductRouter from '../service/routes/productRouter';
import ProductService from '../service/productService';


import RoleModel from '../data/models/roleModel';
import RoleController from '../service/controllers/roleController';
import RoleRouter from '../service/routes/roleRouter';



import {authenticated} from './middleware/middleware-security';

export default async function (logger,
                               dbConnection,
                               corsConfig,
                               securityConfig) {
  const app = express();

  const userRepository = new ModelOfTRepository(UserModel(dbConnection));
  const userController = new UserController(userRepository, logger);
  const userRouter = new UserRouter(userController);


  const productRepository = new ModelOfTRepository(ProductModel(dbConnection));
  const productService = new ProductService(productRepository);

  const productController = new ProductController(productRepository,productService, logger);
  const productRouter = new ProductRouter(productController);

  const roleRepository = new ModelOfTRepository(RoleModel(dbConnection));
  const roleController = new RoleController(roleRepository, logger);
  const roleRouter = new RoleRouter(roleController);



  middlewareLogging(app, logger);
  middlewareRequestParser(app);
  middlewarePassport(app, userRepository, securityConfig);
  // middlewareCors(app, corsConfig);

  const apiRouter = express.Router();
  apiRouter.use('/user', userRouter.Router);
  apiRouter.use('/role', roleRouter.Router);
  apiRouter.use('/product', authenticated(),productRouter.Router);

  app.use('/api', apiRouter);

  app.use((error, req, res, next) => {
    console.log("ERRRORR USEE ");
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });


  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return app;
}
