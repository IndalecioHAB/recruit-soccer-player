// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear una entrada.
const insertEntryModel = async (title, place, description, userId, playerId) => {
    const pool = await getPool();

    // Insertamos la entrada.
    const [entry] = await pool.query(
        `INSERT INTO entry (title, place, description, userId, playerId) VALUES (?, ?, ?, ?, ?)`,
        [title, place, description, userId, playerId],
    );

    // Tratamos de obtener el nombre del jugador
    const [playerName] = await pool.query(
        `SELECT name FROM players WHERE id = ?`,
        [playerId]
    );

    // Retornamos el ID que la base de datos ha asignado a la entrada.
    return {
        entryId: entry.insertId,
        playerName: playerName[0].name,
    }
};

export default insertEntryModel;
