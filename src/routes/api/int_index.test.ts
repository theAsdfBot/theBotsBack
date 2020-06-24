import request from 'supertest';
import app from '../../app';
import ProductKey from '../../models/ProductKey';
import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import ActiveLogin from '../../models/ActiveLogin';

describe('routes/api/index', () => {
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
  describe('/login', () => {
    it('returns 400 if no product key', () => {
      const expectedStatus = 400;
      return request(app)
        .post('/api/login')
        .send({ machineId: 'abc' })
        .expect(expectedStatus);
    });
    it('returns 400 if no machine id', () => {
      const expectedStatus = 400;
      return request(app)
        .post('/api/login')
        .send({ productKey: 'abc' })
        .expect(expectedStatus);
    });
    it('logs in the user', async () => {
      const uuid = 'fe7ea467-b61f-4af8-bc75-ab6bfa81648a';
      const machineId = 'machineid';
      await ProductKey.create({
        id: uuid,
      });
      await request(app)
        .post('/api/login')
        .send({
          productKey: uuid,
          machineId,
        });
      await expect(ActiveLogin.findOne({
        where: {
          productKey: uuid,
        },
      })).resolves.toBeDefined();
    });
  });
});
