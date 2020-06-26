import { Request, Response, NextFunction } from 'express';
import exists from '../services/productKeys/exists';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      productKey,
    } = req.body;
    if (!(await exists(productKey))) {
      res.status(400).json({
        error: 'Product key does not exist',
      });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
};
