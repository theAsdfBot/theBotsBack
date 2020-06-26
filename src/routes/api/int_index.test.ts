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
        })
        .expect(204);
      await expect(ActiveLogin.findOne({
        where: {
          productKey: uuid,
        },
      })).resolves.toBeDefined();
    });
    it('returns 400 if the product key does not exist', async () => {
      const uuid = '70840291-77e8-4022-b6af-e134f93261f4';
      const machineId = 'machineid';
      await request(app)
        .post('/api/login')
        .send({
          productKey: uuid,
          machineId,
        })
        .expect(400);
    });
    it('returns 204 if already logged in', async () => {
      const uuid = 'fe7ea467-b61f-4af8-bc75-ab6bfa81648a';
      const machineId = 'machineid';
      await ProductKey.create({
        id: uuid,
      });
      await ActiveLogin.create({
        productKey: uuid,
        machineId,
      });
      await request(app)
        .post('/api/login')
        .send({
          productKey: uuid,
          machineId,
        })
        .expect(204);
    });
  });
  describe('/logout', () => {
    it('returns 400 if no product key', () => {
      const expectedStatus = 400;
      return request(app)
        .post('/api/logout')
        .send({ machineId: 'abc' })
        .expect(expectedStatus);
    });
    it('returns 400 if no machine id', () => {
      const expectedStatus = 400;
      return request(app)
        .post('/api/logout')
        .send({ productKey: 'abc' })
        .expect(expectedStatus);
    });
    it('returns 403 if no logout has invalid machine id', async () => {
      const uuid = 'fe7ea467-b61f-4af8-bc75-ab6bfa81648a';
      const machineId = 'machine id';
      await ProductKey.create({
        id: uuid,
      });
      await ActiveLogin.create({
        productKey: uuid,
        machineId,
      });
      const expectedStatus = 403;
      await request(app)
        .post('/api/logout')
        .send({
          productKey: uuid,
          machineId: `${machineId}foobar`,
        })
        .expect(expectedStatus);
    });
    it('logs out the user', async () => {
      const uuid = 'fe7ea467-b61f-4af8-bc75-ab6bfa81648a';
      const machineId = 'machineid';
      await ProductKey.create({
        id: uuid,
      });
      await ActiveLogin.create({
        productKey: uuid,
        machineId,
      });
      await request(app)
        .post('/api/logout')
        .send({
          productKey: uuid,
          machineId,
        });
      await expect(ActiveLogin.findOne({
        where: {
          productKey: uuid,
        },
      })).resolves.toBeNull();
    });
    it('returns 400 if the product key does not exist', async () => {
      const uuid = '70840291-77e8-4022-b6af-e134f93261f4';
      const machineId = 'machineid';
      await request(app)
        .post('/api/login')
        .send({
          productKey: uuid,
          machineId,
        })
        .expect(400);
    });
  });
});
