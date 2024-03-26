// Importamos los modelos.
import selectPlayerByIdModel from '../../models/players/selectPlayerByIdModel.js';
import updatePlayerAvatarModel from '../../models/players/updatePlayerAvatarModel.js';

// Importamos los servicios.
import { deletePhoto, savePhoto } from '../../services/photoService.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';

// Función controladora final que permite cambiar el avatar de un jugador.
const editPlayerAvatarController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi. Si "files" no existe enviamos un objeto vacío de lo contrario
        // se generaría un error.
        await validateSchema(editUserAvatarSchema, req.files || {});

        // Tomamos la info del req.params
        const { playerId } = req.params;

        // Obtenemos los datos del jugador.
        const player = await selectPlayerByIdModel(req.user.id, playerId);

        // Comprobamos si el jugador tiene un avatar previo. De ser así lo eliminamos.
        if (player?.avatar) {
            await deletePhoto(player.avatar);
        }

        // Guardamos el nuevo avatar en la carpeta de subida de archivos. Especificamos
        // en el segundo argumento un ancho de 150px para la redimensión.
        const avatarName = await savePhoto(req.files.avatar, 150);

        // Guardamos el nombre del avatar en la base de datos.
        await updatePlayerAvatarModel(avatarName, playerId);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Avatar Updated',
            data: {
                avatar: {
                    name: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editPlayerAvatarController;
