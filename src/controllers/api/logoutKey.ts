import { Response, Request, NextFunction } from 'express';
import logout from '../../services/activeLogins/logout';
import logoutIsAuthorized from '../../services/activeLogins/logoutIsAuthorized';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      productKey,
      machineId,
    } = req.body;
    if (!(await logoutIsAuthorized(productKey, machineId))) {
      res.status(403).json({
        error: 'Unauthorized logout',
      });
      return;
    }
    await logout(productKey);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
