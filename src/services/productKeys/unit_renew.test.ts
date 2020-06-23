import syncDatabase from '../../database/syncDatabase';
import sequelize from '../../database/sequelize';
import renew from './renew';
import ProductKey from '../../models/ProductKey';

jest.mock('../../models/ProductKey');

describe('Unit::services/productKeys/renew', () => {
  it('throws an error if no expireAt found', async () => {
    jest.spyOn(ProductKey, 'findOne')
      .mockResolvedValue({
        expireAt: null,
      } as unknown as ProductKey);
    await expect(renew('d', 1)).rejects
      .toThrow('Missing product key or product key expireAt');
  });
  it('throws an error if no product key found', async () => {
    jest.spyOn(ProductKey, 'findOne')
      .mockResolvedValue(null as unknown as ProductKey);
    await expect(renew('d', 1)).rejects
      .toThrow('Missing product key or product key expireAt');
  });
});
