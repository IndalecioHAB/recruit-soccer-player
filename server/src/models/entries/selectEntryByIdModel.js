// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos las entradas.
import { notFoundError } from '../../services/errorService.js';

// Función que realiza una consulta a la base de datos retornar una entrada concreta.
const selectEntryByIdModel = async (entryId, userId = '') => {
    const pool = await getPool();

    // Intentamos localizar la entrada con el id recibido.
    const [entries] = await pool.query(
        `
            SELECT 
                e.id,
                e.title,
                e.place,
                e.description,
                e.userId,
                e.userId = ? AS owner,
                u.username,
                e.createdAt,
                e.playerId
            FROM entry e
            INNER JOIN users u ON u.id = e.userId
            WHERE e.id = ?
        `,
        [userId, entryId],
    );

    // Si no existe la entrada lanzamos un error.
    if (entries.length < 1 || entries[0].id === null) {
        notFoundError('entrada');
    }

    // Obtenemos un array con todas las fotos de la entrada.
    const [videos] = await pool.query(
        `SELECT id, VideoName FROM entryVideos WHERE entryId = ?`,
        [entryId],
    );

    // Agregamos las fotos a la entrada que está en la posición 0.
    entries[0].videos = videos;

    // Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
    entries[0].owner = Boolean(entries[0].owner);

    // Cambiamos el tipo de la propiedad "votedByMe" de Number a Boolean.
    entries[0].votedByMe = Boolean(entries[0].votedByMe);

    // Retornamos la entrada de la posicón 0 con las fotos.
    return entries[0];
};

export default selectEntryByIdModel;
