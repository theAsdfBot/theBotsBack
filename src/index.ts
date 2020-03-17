import sequelize from './database/sequelize';
import syncDatabase from './database/syncDatabase';
import log from './util/log';
import app from './app';
import config from './config/config';

syncDatabase(sequelize, true).then(() => {
  log.debug('Database synced');
  // Proceed to boot up Skynet
  app.listen(config.port, () => {
    log.info(`Express listening on port ${config.port}`);
  });
}).catch((err) => {
  throw err;
});
