import { Router } from 'express';
import { object, string } from 'superstruct';
import loginKey from '../../controllers/api/loginKey';
import validateBody from '../../util/validateBody';

const router = Router();

const LoginSchema = object({
  productKey: string(),
  machineId: string(),
});

/**
 * GET /api/login, for example at http://localhost:8080/api/login
 */
router.post('/login', validateBody(LoginSchema), loginKey);

export default router;
