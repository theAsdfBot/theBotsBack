import sequelize from './database/sequelize';
import syncDatabase from './database/syncDatabase';
import log from './util/log';

syncDatabase(sequelize, true).then(() => {
  log.debug('Database synced');
  // Proceed to boot up Skynet
});
