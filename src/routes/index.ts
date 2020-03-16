import { Router } from 'express';
import rootHello from '../controllers/rootHello';

const router = Router();

/**
 * GET /, for example at http://localhost:8080/
 * Returns "Hello World from the root!"
 */
router.get('/', rootHello);

export default router;
