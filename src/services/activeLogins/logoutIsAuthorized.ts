import ActiveLogin from '../../models/ActiveLogin';

export default async (productKeyID: string, machineId: string) => ActiveLogin.findOne({
  where: {
    productKey: productKeyID,
    machineId,
  },
});
