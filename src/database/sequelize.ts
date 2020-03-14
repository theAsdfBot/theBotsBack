import { Sequelize } from 'sequelize';
import config from '../config/config';

const { uri } = config;

export default new Sequelize(uri);
