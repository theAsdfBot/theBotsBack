import { Model, DataTypes, Sequelize } from 'sequelize';
import ProductKey from './ProductKey';

// Active logins never expire until they're logged out

class ActiveLogin extends Model {
  public id!: string;

  // createdAt is inherent to Model
  public readonly createdAt!: Date;

  // updatedAt is inherent to Model
  public readonly updatedAt!: Date;

  public readonly expireAt!: Date;

  static initialize: (sequelize: Sequelize) => void;
}

ActiveLogin.initialize = (sequelize: Sequelize) => {
  ActiveLogin.init({
    machineId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'active_logins',
  });

  // Foreign key defined on source model, ActiveLogin
  ActiveLogin.belongsTo(ProductKey, {
    foreignKey: {
      name: 'productKey',
      allowNull: false,
    },
    // Delete this login when its product key was deleted
    onDelete: 'CASCADE',
  });
};

export default ActiveLogin;
