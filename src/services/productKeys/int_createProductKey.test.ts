import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import createProductKey from './createProductKey';
import ProductKey from '../../models/ProductKey';

describe('services/productKeys', () => {
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
    await sequelize.close();
  });
  it('creates a new product key', async () => {
    const created = await createProductKey();
    expect(created.id).toBeDefined();
    const result = await ProductKey.findOne({
      where: {
        id: created.id,
      },
    });
    expect(result).toBeDefined();
  });
});
