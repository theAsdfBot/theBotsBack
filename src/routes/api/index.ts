import { Router } from 'express';
import { object, string } from 'superstruct';
import loginKey from '../../controllers/api/loginKey';
import validateBody from '../../util/validateBody';
import logoutKey from '../../controllers/api/logoutKey';
import productKeyExists from '../../middleware/productKeyExists';

const router = Router();

const LoginSchema = object({
  productKey: string(),
  machineId: string(),
});

router.use(validateBody(LoginSchema), productKeyExists);

/**
 * POST /api/login
 */
router.post('/login', loginKey);

/**
 * POST /api/logout
 */
router.post('/logout', logoutKey);

export default router;
