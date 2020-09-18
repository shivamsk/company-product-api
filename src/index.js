import '@babel/polyfill';

import application from './service/app';
import initDb from './service/init/initDb';

import dbConfig from '../config/development/db.json';
import logConfig from '../config/development/log.json';
import securityConfig from '../config/development/security.json';

import { logger } from './common/logger';

const PORT = process.env.PORT || 5000;

Promise.all([

  initDb(dbConfig.cnd)

]).then(async ([dbConnection]) => {

  const app = await application(logger, dbConnection, securityConfig);

  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });

  process.on('SIGINT', async () => {
    await dbConnection.close();
  });

}).catch((err) => {
  console.log('An error occurred while initializing the application.', err);
});
