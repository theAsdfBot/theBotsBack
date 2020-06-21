import { Sequelize } from 'sequelize';
import ProductKey from '../models/ProductKey';
import log from '../util/log';
import ActiveLogin from '../models/ActiveLogin';

/**
 * Initialize all models and create relevant tables if they
 * don't exist
 *
 * @param sequelize Sequelize instance
 * @param force Drop existing tables if they exist
 */
const sync = async (sequelize: Sequelize, force = false) => {
  ProductKey.initialize(sequelize);
  // Product key must be initialized before Active Login for foreign keys
  ActiveLogin.initialize(sequelize);

  log.debug(`Creating all necessary tables. dropping existing tables: ${force}`);
  await sequelize.sync({
    force,
  });
};


export default sync;
