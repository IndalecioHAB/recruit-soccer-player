// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para borrar un jugador.
const deletePlayerModel = async (playerId, userId) => {
  const pool = await getPool();

  // Borramos los contratos relacionados con el jugador
  await pool.query(`DELETE FROM RecruitmentRequests WHERE playerId = ?`, [playerId]);

  // Eliminamos los videos de las entradas del jugador.
  await pool.query(`DELETE FROM entryVideos WHERE playerId = ?`, [playerId]);

  // Borramos las entradas relacionadas con el jugador
  await pool.query(`DELETE FROM entry WHERE playerId = ? AND userId = ?`, [
    playerId,
    userId,   
  ]);

  // Borramos los datos del jugador.
  await pool.query(`DELETE FROM players WHERE id = ? AND userId = ?`, [
    playerId,
    userId,
  ]);
};

export default deletePlayerModel;