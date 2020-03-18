import { Sequelize } from 'sequelize';
import log from '../util/log';
import config from '../config/config';

let { uri } = config.test;
const env = process.env.NODE_ENV;
if (env === 'production' || env === 'test') {
  uri = config[env].uri;
}

export default new Sequelize(uri, {
  logging: (sqlString) => log.debug(sqlString),
});
