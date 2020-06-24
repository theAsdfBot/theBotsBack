import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import ProductKey from '../../models/ProductKey';
import ActiveLogin from '../../models/ActiveLogin';
import logoutIsAuthorized from './logoutIsAuthorized';

describe('services/activeLogins/logoutIsAuthorized', () => {
  beforeAll(async () => {
    await syncDatabase(sequelize);
  });
  beforeEach(async () => {
    await ProductKey.destroy({
      where: {},
      force: true,
    });
  });
  it('returns correctly', async () => {
    const productKeyID = '99b502f4-c180-42b8-8733-0c462a13785f';
    const machineId = 'abc';
    await ProductKey.create({
      id: productKeyID,
    });
    await ActiveLogin.create({
      productKey: productKeyID,
      machineId,
    });
    await expect(logoutIsAuthorized(productKeyID, `${machineId}abcd`))
      .resolves.toBeNull();
    await expect(logoutIsAuthorized(productKeyID, machineId))
      .resolves.toBeDefined();
  });
  afterAll(async () => {
    await sequelize.drop();
    await sequelize.close();
  });
});
