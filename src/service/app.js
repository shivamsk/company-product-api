import express from 'express';
import middlewareLogging from './middleware/middlewareLogger';
import middlewarePassport from './middleware/middlewarePassport';
import middlewareRequestParser from './middleware/middlewareRequestParser';
import { authenticated } from './middleware/middlewareSecurity';

//  Common components
import ModelOfTRepository from '../data/repositories/modelOfTRepository';

// User
import UserModel from '../data/models/userModel';
import UserController from './controllers/userController';
import UserRouter from './routes/userRouter';

// Product
import ProductModel from '../data/models/productModel';
import ProductController from './controllers/productController';
import ProductRouter from './routes/productRouter';
import ProductService from './productService';

import RoleModel from '../data/models/roleModel';
import RoleController from './controllers/roleController';
import RoleRouter from './routes/roleRouter';

import CategoryModel from '../data/models/categoryModel';
import CategoryController from './controllers/categoryController';
import CategoryRouter from './routes/categoryRouter';


export default async function (logger,
  dbConnection,
  securityConfig) {
  const app = express();

  const userRepository = new ModelOfTRepository(UserModel(dbConnection));
  const userController = new UserController(userRepository, logger);
  const userRouter = new UserRouter(userController);

  const productRepository = new ModelOfTRepository(ProductModel(dbConnection));
  const productService = new ProductService(productRepository);

  const productController = new ProductController(productRepository, productService, logger);
  const productRouter = new ProductRouter(productController);

  const roleRepository = new ModelOfTRepository(RoleModel(dbConnection));
  const roleController = new RoleController(roleRepository, logger);
  const roleRouter = new RoleRouter(roleController);

  const categoryRepository = new ModelOfTRepository(CategoryModel(dbConnection));
  const categoryController = new CategoryController(categoryRepository, logger);
  const categoryRouter = new CategoryRouter(categoryController);

  middlewareLogging(app, logger);
  middlewareRequestParser(app);
  middlewarePassport(app, userRepository, securityConfig);

  const apiRouter = express.Router();
  apiRouter.use('/user', userRouter.Router);
  apiRouter.use('/role', authenticated(),roleRouter.Router);
  apiRouter.use('/product', authenticated(), productRouter.Router);
  apiRouter.use('/category', authenticated(), categoryRouter.Router);

  app.use('/api', apiRouter);

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
}
