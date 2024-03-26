// Importamos los modelos.
import selectPlayerByIdModel from '../../models/players/selectPlayerByIdModel.js';

// Función controladora final que retorna el listado de entradas.
const getPlayerController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { playerId } = req.params;

        // Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
        // "user" podría ser undefined.
        const player = await selectPlayerByIdModel(playerId, req.user?.id);        
        
        res.send({
            status: 'ok',
            data: {
                player,                
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPlayerController;
