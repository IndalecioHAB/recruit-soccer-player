// Importamos los modelos.
import selectPlayerByIdModel from '../../models/players/selectPlayerByIdModel.js';
import updatePlayerModel from '../../models/players/updatePlayerModel.js';

// Importamos los errores que necesitamos
import { notFoundError } from '../../services/errorService.js';

// Función controladora final que permite cambiar los datos del jugador.
const editPlayerController = async (req, res, next) => {
    try {
        // Obtenemos los req params
        const { playerId } = req.params;
        
        // Lanzamos el error si no vienen datos de req params
        if (!playerId) {
            notFoundError('playerId');
        }

        // Obtenemos los datos del body.
        let { lastName, name, age, position, skills, currentTeam } = req.body;

        // Obtenemos los datos del jugador.
        const player = await selectPlayerByIdModel(playerId, req.user.id);

        // Creo la variable para poder introducirla en la respuesta del servidor
        const userId = req.user.id;

        // Si los datos que nos llegan del cliente coinciden con los datos actuales del jugador,
        // vaciamos el contenido de la variable.
        name = name === player.name ? null : name;
        age = age === player.age ? null : age;
        position = position === player.position ? null : position;
        skills = skills === player.skills ? null : skills;
        currentTeam = currentTeam === player.currentTeam ? null : currentTeam;

        // Actualizamos los datos del jugador.
        await updatePlayerModel(name, age, position, skills, currentTeam, req.user.id, player.id);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Player Updated',
            data: {
                player: {   
                    userId,                 
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editPlayerController;
