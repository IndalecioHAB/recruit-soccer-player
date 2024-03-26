// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos las entradas.
import { notFoundError } from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos retornar un contrato al reclutador.
const selectContractByRecruiterModel = async (recruiterId = "") => {
  const pool = await getPool();

  // Intentamos localizar el contrato con el id del usuario reclutador recibido.
  const [contract] = await pool.query(
    `
        SELECT 
        r.id,
        r.playerId,
        r.familyId,
        r.recruiterId,
        p.name,
        u.username AS family,
        r.status
    FROM RecruitmentRequests r   
    INNER JOIN players p ON r.playerId = p.id
    iNNER JOIN users u ON p.userId = u.id          
    WHERE r.recruiterId = ?
        `,
    [recruiterId]
  );

  // Si no existe la entrada lanzamos un error.
  if (contract.length < 1 || contract[0].id === null) {
    notFoundError("entrada");
  }

  // Retornamos el contrato.
  return contract[0];
};

export default selectContractByRecruiterModel;
