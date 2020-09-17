import "@babel/polyfill";


import application from './service/app';
import initDb from './service/init/init-db';


import dbConfig from '../config/development/db.json';
import logConfig from '../config/development/log.json';
// import corsConfig from '../config/development/cors.json';
import securityConfig from '../config/development/security.json';

// #region Common components
import {getLogger} from './common/lib/logger';
// #endregion
const PORT = process.env.PORT || 5000;
Promise.all([
  initDb(dbConfig.cnd)
]).then(async ([dbConnection]) => {
  const logger = getLogger(logConfig);
  // const app = await application(logger, dbConnection, corsConfig, securityConfig);
  const app = await application(logger, dbConnection, null, securityConfig);
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
  process.on('SIGINT', async () => {
    await dbConnection.close();
  });
}).catch(err => {
  console.log('An error occurred while initializing the application.', err);
});