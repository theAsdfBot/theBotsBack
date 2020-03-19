import ProductKey from '../../models/ProductKey';

export default async () => {
  const productKey = await ProductKey.create();
  return productKey;
};
