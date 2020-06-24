import ProductKey from '../../models/ProductKey';

export default async (productKeyId: string) => !!ProductKey.findByPk(productKeyId);
