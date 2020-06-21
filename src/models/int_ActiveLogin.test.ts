import * as Sequelize from 'sequelize';
import ActiveLogin from './ActiveLogin';
import ProductKey from './ProductKey';
import syncDatabase from '../database/syncDatabase';
import sequelize from '../database/sequelize';

describe('models/ActiveLogin', () => {
  beforeAll(async () => {
    await syncDatabase(sequelize, true);
  });
  beforeEach(async () => {
    await ProductKey.destroy({
      where: {},
      force: true,
    });
    await ActiveLogin.destroy({
      where: {},
      force: true,
    });
  });
  it('throws if no product key exists', async () => {
    const productKey = 'b3a2e219-a013-4c02-81fd-5642fa942368';
    const creation = ActiveLogin.create({
      machineId: '1',
      productKey,
    });
    await expect(creation).rejects.toThrow(Sequelize.ForeignKeyConstraintError);
  });
  it('can be created', async () => {
    const createdProductKey = await ProductKey.create();
    const creation = ActiveLogin.create({
      machineId: '1',
      productKey: createdProductKey.id,
    });
    await expect(creation).resolves.toEqual(expect.objectContaining({
      machineId: '1',
      productKey: createdProductKey.id,
    }));
  });
  it('auto deletes if product key is deleted', async () => {
    const uuid = 'a5407d22-e268-452a-83b9-20aad36bb1a7';
    const machineId = 'blurp';
    await sequelize.query(`INSERT INTO ${ProductKey.tableName} (id, "createdAt", "updatedAt") VALUES ('${uuid}', NOW(), NOW())`);
    await sequelize.query(`INSERT INTO ${ActiveLogin.tableName} ("productKey", "machineId", "createdAt", "updatedAt") VALUES ('${uuid}', '${machineId}', NOW(), NOW())`);
    await sequelize.query(`DELETE FROM ${ProductKey.tableName} WHERE id = '${uuid}'`);
    const logins = await ActiveLogin.findAll();
    expect(logins).toHaveLength(0);
  });
  afterAll(async () => {
    await sequelize.close();
  });
});
