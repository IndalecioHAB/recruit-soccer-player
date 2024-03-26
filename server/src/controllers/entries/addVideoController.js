// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import insertVideoModel from '../../models/entries/insertVideoModel.js';

// Importamos los servicios.
import { saveVideo } from '../../services/videoService.js';

// Importamos los servicios.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema.
import addVideoSchema from '../../schemas/entries/addVideoSchema.js';

// Importamos los errores.
import {
    photoLimitReachedError,
    unauthorizedUserError,
} from '../../services/errorService.js';

// Función controladora final que agrega una foto a una entrada.
const addVideoController = async (req, res, next) => {
    try {
        // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
        // si se da el caso.
        await validateSchema(addVideoSchema, req.files || {});

        // Obtenemos los path params.
        const { entryId, playerId } = req.params;

        // Obtenemos la foto.
        const video = req.files?.video;

        // Seleccionamos la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los dueños de la entrada lanzamos un error.
        if (entry.userId !== req.user.id) {
            unauthorizedUserError();
        }

        // Si la entrada tiene más de 3 fotos lanzamos un error.
        if (entry.videos.length > 2) {
            photoLimitReachedError();
        }

        // Guardamos la foto en la carpeta de subida de archivos. Le mandamos como argumentos
        // la foto y el ancho. Obtenemos el nombre que se ha generado.
        const videoName = await saveVideo(video);

        // Guardamos la foto en la base de datos y obtenemos su ID.
        const videoId = await insertVideoModel(videoName, entryId, playerId);

        res.status(201).send({
            status: 'ok',
            message: 'Video Added',
            data: {
                video: {
                    id: videoId,
                    name: videoName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default addVideoController;
