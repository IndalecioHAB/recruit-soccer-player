// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import {
    userAlreadyRegisteredError,
} from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para crear un nuevo jugador.
const insertPlayerModel = async (name, age, position, skills, currentTeam, userId) => {
    const pool = await getPool();

    // Buscamos en la base de datos algún jugador con ese nombre en esa familia.
    let [players] = await pool.query(`SELECT id FROM players WHERE name = ? AND userId = ?`, [
        name, userId,
    ]);

    // Si existe algún jugador con ese nombre en esa familia lanzamos un error.
    if (players.length > 0) {
        userAlreadyRegisteredError();
    }

    // Insertamos el jugador.
    await pool.query(
        `INSERT INTO players (name, age, position, skills, currentTeam, userId) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, age, position, skills, currentTeam, userId],
    );
    
};

export default insertPlayerModel;
