import { mocked } from 'ts-jest/utils';
import { Request, Response, NextFunction } from 'express';
import exists from '../../services/productKeys/exists';
import loginKey from './loginKey';
import login from '../../services/activeLogins/login';

jest.mock('../../services/productKeys/exists');
jest.mock('../../services/activeLogins/login');

const mockedExists = mocked(exists);
const mockedLogin = mocked(login);

describe('controllers/api/loginKey', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let status: jest.Mock;
  let json: jest.Mock;
  let end: jest.Mock;
  beforeEach(() => {
    req = {
      body: {},
    } as unknown as Request;
    end = jest.fn();
    json = jest.fn();
    status = jest.fn().mockReturnValue({
      json,
      end,
    });
    res = {
      status,
    } as unknown as Response;
    next = jest.fn();
  });
  it('returns 400 if the key does not exist', async () => {
    mockedExists.mockResolvedValue(false);
    await loginKey(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
  it('returns 204 if successful', async () => {
    mockedExists.mockResolvedValue(true);
    mockedLogin.mockResolvedValue();
    await loginKey(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(end).toHaveBeenCalledTimes(1);
  });
  it('calls next if service funcs fail', async () => {
    const existsError = new Error('exists err');
    mockedExists.mockRejectedValue(existsError);
    await loginKey(req, res, next);
    expect(next).toHaveBeenCalledWith(existsError);
  });
  it('calls err if login service fails', async () => {
    const loginError = new Error('login error');
    mockedExists.mockResolvedValue(true);
    mockedLogin.mockRejectedValue(loginError);
    await loginKey(req, res, next);
    expect(next).toHaveBeenCalledWith(loginError);
  });
});