import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import createProductKey from './createProductKey';
import ProductKey from '../../models/ProductKey';

describe('services/productKeys', () => {
  beforeAll(async () => {
    await syncDatabase(sequelize);
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
    const results = await ProductKey.findAll();
    expect(results.length).toEqual(1);
    expect(results.map((r) => r.id))
      .toEqual([created.id]);
  });
});
