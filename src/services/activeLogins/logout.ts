import ActiveLogin from '../../models/ActiveLogin';

export default async (productKeyID: string) => {
  await ActiveLogin.destroy({
    where: {
      productKey: productKeyID,
    },
  });
};
