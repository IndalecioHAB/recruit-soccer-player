// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updatePlayerAvatarModel = async (avatarName, playerId) => {
    const pool = await getPool();

    // Actualizamos el avatar del usuario.
    await pool.query(`UPDATE players SET avatar = ? WHERE id = ?`, [
        avatarName,
        playerId,
    ]);
};

export default updatePlayerAvatarModel;
