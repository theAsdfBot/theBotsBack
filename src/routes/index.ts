import { Router } from 'express';
import rootHello from '../controllers/rootHello';

const router = Router();

/**
 * GET /hello/world, for example at http://localhost:8080/hello/world
 * Returns "Hello World from the root!"
 */
router.get('/world', rootHello);

export default router;
