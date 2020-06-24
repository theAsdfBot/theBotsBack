import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import ProductKey from '../../models/ProductKey';
import ActiveLogin from '../../models/ActiveLogin';
import logout from './logout';

describe('services/activeLogins/logout', () => {
  beforeAll(async () => {
    await syncDatabase(sequelize);
  });
  beforeEach(async () => {
    await ProductKey.destroy({
      where: {},
      force: true,
    });
  });
  it('destroys the ActiveLogin', async () => {
    const productKeyID = '99b502f4-c180-42b8-8733-0c462a13785f';
    const machineId = 'abc';
    await ProductKey.create({
      id: productKeyID,
    });
    await ActiveLogin.create({
      productKey: productKeyID,
      machineId,
    });
    await logout(productKeyID);
    await expect(ActiveLogin.findOne({
      where: {
        productKey: productKeyID,
      },
    })).resolves.toBeUndefined();
  });
  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });
});
