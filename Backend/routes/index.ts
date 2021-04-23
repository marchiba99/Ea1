import { Router } from 'express';
import PersonasRouter from './personas.routes';

const router: Router = Router();

router.use('/personas', PersonasRouter);

export default router;