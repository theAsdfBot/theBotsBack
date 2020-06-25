import { Response, Request, NextFunction } from 'express';
import productKeyExists from '../../services/productKeys/exists';
import login from '../../services/activeLogins/login';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      productKey,
      machineId,
    } = req.body;
    if (!(await productKeyExists(productKey))) {
      res.status(400).json({
        error: 'Product key does not exist',
      });
      return;
    }
    await login(productKey, machineId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
