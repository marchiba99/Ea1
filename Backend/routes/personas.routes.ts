import { Router } from 'express';
import PersonasController from '../controllers/personas.controller'

const router: Router = Router();

router.get('/', PersonasController.getPersonas);
router.get('/:personaid', PersonasController.getPersona);

router.post('/new', PersonasController.addPersona);

router.put('/:edit', PersonasController.editPersonas);

export default router;