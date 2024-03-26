// Importamos las dependencias.
import express from 'express';

// Importamos la funcion controladora
import getContractController from '../controllers/recruitmentRequests/getContractController.js';
import validateContractController from '../controllers/recruitmentRequests/validateContractController.js';
import getContractByRcruiterController from '../controllers/recruitmentRequests/getContractByRecruiterController.js';
import declineContractController from '../controllers/recruitmentRequests/declineContractController.js';

// Importamos las funciones controladoras intermedias.
import { authUserController } from '../middlewares/index.js';

// Creamos un router.
const router = express.Router();

// Middleware que retorna info de los contratos de una familia
router.get('/contract', authUserController, getContractController);

// Middleware que retorna info de los contratos de un reclutador.
router.get('/contract/recruiter', authUserController, getContractByRcruiterController);

// Middleware que acepta un contrato.
router.put('/contract/:contractId/confirm/:confirmationCode', validateContractController);

// Middleware que cancela un contrato.
router.put('/contract/:contractId/decline', declineContractController);

export default router;