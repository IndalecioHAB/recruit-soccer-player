// Importamos las dependencias.
import express from 'express';

// Importamos las rutas.
import userRoutes from './userRoutes.js';
import entryRoutes from './entryRoutes.js';
import playerRoutes from './playerRoutes.js';
import contractRoutes from './contractRoutes.js';

// Creamos un router.
const router = express.Router();

// Middleware que indica a express dónde están las rutas.
router.use(userRoutes);
router.use(entryRoutes);
router.use(playerRoutes);
router.use(contractRoutes);

export default router;
