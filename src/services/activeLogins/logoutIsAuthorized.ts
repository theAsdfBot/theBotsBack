import ActiveLogin from '../../models/ActiveLogin';

export default async (productKeyID: string, machineId: string) => !!(await ActiveLogin.findOne({
  where: {
    productKey: productKeyID,
    machineId,
  },
}));
