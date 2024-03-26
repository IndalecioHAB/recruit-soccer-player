// Importamos los modelos.
import deletePlayerModel from "../../models/players/deletePlayerModel.js";
// Importamos los errores que necesitamoss
import { notFoundError } from "../../services/errorService.js";

// Función controladora final que permite borrar un jugador.
const deletePlayerController = async (req, res, next) => {
    try {
        // Obtenemos los req params
        const { playerId } = req.params;
         
        // Si no vienen datos de req params lanzamos un error
        if (!playerId) {
            notFoundError('PlayerId');
        }

        // Borramoss el jugador.
        await deletePlayerModel(playerId, req.user.id);        

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Player Deleted'
        });
    } catch (err) {
        next(err);
    }
};

export default deletePlayerController;