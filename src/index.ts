import sequelize from './database/sequelize';
import syncDatabase from './database/syncDatabase';

syncDatabase(sequelize, true).then(() => {
  // Proceed to boot up Skynet
});
