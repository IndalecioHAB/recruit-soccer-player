// Importamos los modelos.
import declineContractModel from "../../models/recruitmentRequests/declineContactModel.js";
// Importamos los errores que necesitamos
import { notFoundError } from "../../services/errorService.js";

// Función controladora final que rechaza un contrato.
const declineContractController = async (req, res, next) => {
    try {
        // Obtenemos el código de aceptación de contrato.
        const { contractId } = req.params;

        if (!contractId) {
            notFoundError('contractId');
        }

        // Rechazamos el contrato
        await declineContractModel(contractId);

        res.send({
            status: 'ok',
            message: 'Declined Contract',
        });
    } catch (err) {
        next(err);
    }
};

export default declineContractController;