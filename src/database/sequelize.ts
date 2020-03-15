import { Sequelize } from 'sequelize';
import config from '../config/config';
import log from '../util/log';

const { uri } = config;

export default new Sequelize(uri, {
  logging: (sqlString) => log.debug(sqlString),
});
