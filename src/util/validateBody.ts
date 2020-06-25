import { Struct, assert } from 'superstruct';
import { Request, Response, NextFunction } from 'express';

export default <T> (schema: Struct<T>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    assert(req.body, schema);
    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
