// Importamos los modelos.
import updateActiveContractModel from "../../models/recruitmentRequests/updateActiveContractModel.js";
// Importamos los errores que necesitamos
import { notFoundError } from "../../services/errorService.js";

// Función controladora final que valida un contrato.
const validateContractController = async (req, res, next) => {
    try {
        // Obtenemos el código de confirmacion y el id del contrato.
        const { confirmationCode, contractId } = req.params;

        // Lanzamos los errores
        if (!confirmationCode) {
            notFoundError('confirmationCode');
        }

        if (!contractId) {
            notFoundError('contractId');
        }

        // Buscamos a un contrato con el código proporcionado.
        const [contract] = await pool.query(
        `SELECT id FROM RecruitmentRequests WHERE confirmationCode = ?`,
        [confirmationCode],
        );

        // Si no existe ningún contrato con ese código lanzamos un error.
        if (contract.length < 1) {
            notFoundError('contract');
        }

        // Aceptamos el contrato.
        await updateActiveContractModel(confirmationCode, contractId);

        res.send({
            status: 'ok',
            message: 'Contract Accepted',
        });
    } catch (err) {
        next(err);
    }
};

export default validateContractController;