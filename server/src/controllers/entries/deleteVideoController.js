// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import deleteVideoModel from '../../models/entries/deleteVideoModel.js';

// Importamos los servicios.
import { deleteVideo } from '../../services/videoService.js';

// Importamos los errores.
import {
    notFoundError,
    unauthorizedUserError,
} from '../../services/errorService.js';

// Función controladora final que elimina una foto de una entrada.
const deleteVideoController = async (req, res, next) => {
    try {
        // Obtenemos los path params.
        const { entryId, videoId } = req.params;

        // Seleccionamos la entrada.
        const entry = await selectEntryByIdModel(entryId);        

        // Si no somos los dueños de la entrada lanzamos un error.
        if (entry.userId !== req.user.id) {
            unauthorizedUserError();
        }

        // Localizamos la foto que queremos eliminar. Debemos asegurarnos de que los ID que
        // comparamos sean de tipo numérico. El path param será tipo string, lo convertimos a
        // Number.
        const video = entry.videos.find(
            (video) => video.id === Number(videoId),
        );

        // Si la foto no existe lanzamos un error.
        if (!video) {
            notFoundError('video');
        }

        // Borramos la foto de la carpeta de subida de archivos.
        await deleteVideo(video.VideoName);

        // Borramos la foto del disco.
        await deleteVideoModel(videoId);

        res.send({
            status: 'ok',
            message: 'Video Deleted',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteVideoController;
