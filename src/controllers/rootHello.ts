import { Response, Request } from 'express';

export default (req: Request, res: Response) => {
  res.send('Hello world from the root!');
};
