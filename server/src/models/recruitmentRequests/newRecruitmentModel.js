// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos.
const newRecruitmentModel = async (recruiterId, familyId, familyPlayerId) => {
  const pool = await getPool();

  // Consulta rapida para saber el nombre del reclutador
  const [recruiterName] = await pool.query(
    `SELECT username FROM users WHERE id = ?`,
    [recruiterId]
  );

  // Consulta rapida para obtener el email de la familia sin que se vea en React
  const [familyEmail] = await pool.query(
    `SELECT email FROM users WHERE id = ?`,
    [familyId]
  );

  // Consulta rapida para obtener el nombre de los jugadores que aparecen en la entrada
  const [playerName] = await pool.query(
    `SELECT name FROM players WHERE id = ?`,
    [familyPlayerId]
  );

  return {
    recruiterName: recruiterName[0].username,
    familyEmail: familyEmail[0].email,
    playerName: playerName[0].name,
  };
};

export default newRecruitmentModel;
