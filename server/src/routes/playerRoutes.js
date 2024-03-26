// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newPlayerController,
    editPlayerController,
    editPlayerAvatarController,
    deletePlayerController,
    getPlayerController,
} from '../controllers/players/index.js';

// Importamos las funciones controladoras intermedias.
import { authUserController } from '../middlewares/index.js';

// Creamos un router.
const router = express.Router();

// Middleware de creación de un jugador.
router.post('/users/player', authUserController, newPlayerController);

// Middleware que permite cambiar los datos de un jugador
router.put('/users/player/:playerId', authUserController, editPlayerController);

// Middleware que permite cambiar el avatar de un jugador.
router.put('/users/player/:playerId/avatar', authUserController, editPlayerAvatarController);

// Middleware que permite borrar un jugador.
router.delete('/users/player/:playerId', authUserController, deletePlayerController );

// Middleware que permite obtener un jugador concreto por id
router.get('/users/player/:playerId', authUserController, getPlayerController);


export default router;
