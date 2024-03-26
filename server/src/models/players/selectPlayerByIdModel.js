// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar un jugador con un id dado.
const selectPlayerByIdModel = async (playerId, userId) => {
    const pool = await getPool();
    
        // Buscamos en la base de datos algún jugador con ese nombre.
        const [player] = await pool.query(
            `SELECT players.id, players.name, players.age, players.position,
            players.skills, players.currentTeam, players.avatar FROM players
            INNER JOIN users ON users.id = players.userId
            WHERE players.id = ? AND users.id = ?`,
            [playerId, userId],
        );        

    return player[0];
};

export default selectPlayerByIdModel;
