import { Model, DataTypes, Sequelize } from 'sequelize';

class ProductKey extends Model {
  public id!: string;

  // createdAt is inherent to Model
  public readonly createdAt!: Date;

  // updatedAt is inherent to Model
  public readonly updatedAt!: Date;

  public readonly expireAt!: Date;

  static initialize: (sequelize: Sequelize) => void;
}

ProductKey.initialize = (sequelize: Sequelize) => {
  ProductKey.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    expireAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('NOW() + interval \'6 months\''),
    },
  }, {
    sequelize,
    tableName: 'product_keys',
  });
};

export default ProductKey;
