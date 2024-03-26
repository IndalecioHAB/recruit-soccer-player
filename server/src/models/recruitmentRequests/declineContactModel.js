// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para rechazar un contrato.
const declineContractModel = async (contractId) => {
  const pool = await getPool();

  // Rechazamos el contrato.
  await pool.query(
    `UPDATE recruitmentrequests SET status = 'rejected' WHERE id = ?`,
    [contractId]
  );
  //Borramos el contrato
  // await pool.query(`DELETE FROM recruitmentrequests WHERE id = ?`, [
  //   contractId,
  // ]);
};

export default declineContractModel;
