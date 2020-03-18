import generateKey from '../../util/generateKey';
import ProductKey from '../../models/ProductKey';

export default async () => {
  const id = generateKey();
  const productKey = await ProductKey.create({
    id,
  });
  return productKey;
};
