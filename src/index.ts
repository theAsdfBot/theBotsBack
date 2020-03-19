import sequelize from './database/sequelize';
import syncDatabase from './database/syncDatabase';
import log from './util/log';
import app from './app';
import config from './config/config';

let { port } = config.development;
const env = process.env.NODE_ENV;
if (env === 'test' || env === 'production') {
  port = config[env].port;
}

syncDatabase(sequelize, true).then(() => {
  log.debug('Database synced');
  // Proceed to boot up Skynet
  app.listen(port, () => {
    log.info(`Express listening on port ${port}`);
  });
}).catch((err) => {
  log.error('Failed to connect to database', err);
  process.exit(1);
});
