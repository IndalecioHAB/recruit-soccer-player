// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos los errores.
import { notFoundError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos para activar un contrato.
const updateActiveContractModel = async (confirmationCode, contractId) => {
    const pool = await getPool();

    // Aceptamos el contrato.
    await pool.query(
        `UPDATE RecruitmentRequests SET confirmationCode = ?, status = 'accepted' WHERE id = ?`,
        [confirmationCode, contractId],
    );
};

export default updateActiveContractModel;
