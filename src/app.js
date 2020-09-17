import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

import UserController from './controllers/userController';
import UserRouter from './routes/userRouter';

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

const userController = new UserController();
const userRouter = new UserRouter(userController);


const apiRouter = express.Router();
apiRouter.use('/abc', userRouter.Router);
app.use('/api', apiRouter);
console.log("TestTest");
export default app;

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
//
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// module.exports = app;


//{
//  "presets": ["@babel/preset-env"]
//}


// "scripts": {
//   "test": "jest --config --colors --detectOpenHandles",
//       "clearJest": "jest --clearCache",
//       "server": "node ./dist-server/bin/www",
//       "prod": "NODE_ENV=production npm-run-all build server",
//       "start": "node ./server/bin/www",
//       "transpile": "babel ./server --out-dir dist-server",
//       "clean": "rimraf dist-server",
//       "build": "npm-run-all clean transpile",
//       "dev": "NODE_ENV=development npm-run-all build server",
//       "watch:dev": "nodemon",
//       "babelbuild": "rm -rf dist && webpack --mode development && node ./dist/index",
//       "babelstart": "webpack-dev-server --output-public-path=/dist/  --mode development --progress --open --hot"
// },