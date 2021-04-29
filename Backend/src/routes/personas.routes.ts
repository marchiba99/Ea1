import { Router } from 'express';
import PersonasController from '../controllers/personas.controller'

const router = Router();

router.route("/persones").get(PersonasController.getPersonas);

/*
router.route("/persones/:personaid")
    .get(PersonasController.getPersona)
    .put(PersonasController.editPersonas);

router.route("/new").post(PersonasController.addPersona);
*/

export default router;
