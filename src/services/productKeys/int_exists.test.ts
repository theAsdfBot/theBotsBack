import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import ProductKey from '../../models/ProductKey';
import exists from './exists';

describe('services/productKeys/exists', () => {
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
  it('creates a new product key', async () => {
    const uuid1 = '99b502f4-c180-42b8-8733-0c462a13785f';
    const uuid2 = '35f3091a-ed8e-4f90-a824-15ab8c98d91d';
    await ProductKey.create({
      id: uuid1,
    });
    await expect(exists(uuid1)).resolves.toEqual(true);
    await expect(exists(uuid2)).resolves.toEqual(false);
  });
});
