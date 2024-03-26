// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
import deleteVideoModel from '../../models/entries/deleteVideoModel.js';
import deleteEntryModel from '../../models/entries/deleteEntryModel.js';

// Importamos los servicios.
import { deleteVideo } from '../../services/videoService.js';

// Importamos los errores.
import { unauthorizedUserError } from '../../services/errorService.js';

// Función controladora final que elimina una entrada.
const deleteEntryController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada que queremos eliminar.
        const { entryId } = req.params;

        // Obtenemos los datos de la entrada.
        const entry = await selectEntryByIdModel(entryId);

        // Si no somos los dueños de la entrada y no somos administradores lanzamos un error.
        if (entry.userId !== req.user.id && req.user.role !== 'admin') {
            unauthorizedUserError();
        }

        // Recorremos el array de fotos.
        for (const video of entry.videos) {
            // Eliminamos las foto de la carpeta de subida de archivos
            await deleteVideo(video.VideoName);

            // Eliminamos la foto de la base de datos.
            await deleteVideoModel(video.id);
        }

        // Eliminamos la entrada.
        await deleteEntryModel(entryId);

        res.send({
            status: 'ok',
            message: 'Entry Deleted',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;
