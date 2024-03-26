// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js';
// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora final que retorna el listado de entradas.
const getEntryController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { entryId } = req.params;

        // Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
        // "user" podría ser undefined.
        const entry = await selectEntryByIdModel(entryId, req.user?.id);

        // Consulta rapida para obtener el nombre de los jugadores que aparecen en la entrada 
        const player = entry.playerId;
        const pool = await getPool();
        const [playerName] = await pool.query(
            `SELECT name FROM players WHERE id = ?`,
            [player],
        );
        
        res.send({
            status: 'ok',
            data: {
                entry: {
                    ...entry,
                    playerName: playerName,
                }
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getEntryController;
