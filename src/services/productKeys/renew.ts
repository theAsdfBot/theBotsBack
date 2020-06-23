import ProductKey from '../../models/ProductKey';

export default async (id: string, days: number) => {
  const productKey = await ProductKey.findOne({
    where: {
      id,
    },
  });
  if (!productKey || !productKey.expireAt) {
    throw new Error('Missing product key or product key expireAt');
  }
  const ms = 1000 * 60 * 60 * 24 * days + 1;
  await productKey.update({
    expireAt: new Date(productKey.expireAt.getTime() + ms),
  });
};
