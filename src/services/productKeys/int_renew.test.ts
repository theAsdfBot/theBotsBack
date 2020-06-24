import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import renew from './renew';
import ProductKey from '../../models/ProductKey';

describe('services/productKeys/renew', () => {
  beforeAll(async () => {
    await syncDatabase(sequelize);
  });
  beforeEach(async () => {
    await ProductKey.destroy({
      where: {},
      force: true,
    });
  });
  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });
  it('renews the product key', async () => {
    const key = await ProductKey.create({
      expireAt: Date.UTC(2000, 12, 1),
    });
    await renew(key.id, 3);
    const found = await ProductKey.findOne({
      where: {
        id: key.id,
      },
    });
    // getDate will return a local time when instead we want a standardized comparison
    expect(found?.expireAt.getUTCDate()).toEqual(4);
  });
});
