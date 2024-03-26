// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertVideoModel = async (videoName, entryId, playerId) => {
    const pool = await getPool();

    // Insertamos la foto.
    const [video] = await pool.query(
        `INSERT INTO entryVideos (videoName, entryId, playerId) VALUES (?, ?, ?)`,
        [videoName, entryId, playerId],
    );

    // Retornamos el ID que la base de datos ha asignado a la foto.
    return video.insertId;
};

export default insertVideoModel;
