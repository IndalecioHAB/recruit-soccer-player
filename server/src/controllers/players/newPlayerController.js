// Importamos los modelos.
import insertPlayerModel from '../../models/players/insertPlayerModel.js';

// Función controladora final que crea un nuevo jugador.
const newPlayerController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.   
        
        // Necesitamos obtener el id del usuario (familia) que está encriptado en el token.
        const userId = req.user.id;

        // Obtenemos los datos del body.
        const { name, age, position, skills, currentTeam } = req.body;

        // Insertamos el jugador.
        await insertPlayerModel(name, age, position, skills, currentTeam, userId);

        res.status(201).send({
            status: 'ok',
            message: 'New Player Created',
            data: {
                player: {                    
                    name,
                    age,
                    position,
                    skills,
                    currentTeam,
                    userId,
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

export default newPlayerController;
