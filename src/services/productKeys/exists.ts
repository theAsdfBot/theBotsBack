import ProductKey from '../../models/ProductKey';

export default async (productKeyId: string) => !!(await ProductKey.findByPk(productKeyId));
