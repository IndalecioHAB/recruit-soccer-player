// Importamos las dependencias.
import express from 'express';

// IMportamos la funcion que permite mandar un email con el contrato
import newRecruitmentController from '../controllers/recruitmentRequests/newRecruitmentController.js';

// Importamos las funciones controladoras finales.
import {
    newEntryController,
    listEntriesController,
    getEntryController,
    addVideoController,
    deleteVideoController,
    deleteEntryController,
} from '../controllers/entries/index.js';

// Importamos las funciones controladoras intermedias.
import {
    authUserController,
    authUserOptionalController,
} from '../middlewares/index.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite crear una entrada.
router.post('/entries/:playerId', authUserController, newEntryController);

// Middleware que retorna el listado de entradas.
router.get('/entries', authUserOptionalController, listEntriesController);

// Middleware que retorna info de una entrada concreta.
router.get('/entries/:entryId', authUserOptionalController, getEntryController);

// Middleware que agrega un video a una entrada existente.
router.post('/entries/:entryId/videos/:playerId', authUserController, addVideoController);

// Middleware que elimina un video de una entrada existente.
router.delete(
    '/entries/:entryId/videos/:videoId',
    authUserController,
    deleteVideoController,
);

// Middleware que permite eliminar una entrada existente.
router.delete('/entries/:entryId', authUserController, deleteEntryController);

// Middleware de creación de CONTRATO.
router.post('/entries/:entryId/player/:playerId', authUserController, newRecruitmentController);

export default router;
