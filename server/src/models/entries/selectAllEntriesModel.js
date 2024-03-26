// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos retornar el listado de entradas.
const selectAllEntriesModel = async (
    age = '',
    position = '',
    skills = '',
    currentTeam = '',
    keyword = '',
    userId = '',
    limit,
    offset,
) => {
    const pool = await getPool();

    // Obtenemos todas las entradas.
    const [entries] = await pool.query(
        `
            SELECT 
                e.id,
                e.title,
                e.place,
                e.userId,
                e.userId = ? as owner,
                u.username,
                p.name as playerName,
                p.age,
                p.position,
                p.currentTeam,
                e.createdAt
            FROM entry e
            INNER JOIN users u ON u.id = e.userId
            INNER JOIN players p ON p.id = e.playerId           
            WHERE p.age LIKE ? AND p.position
            LIKE ? AND p.skills LIKE ? AND p.currentTeam LIKE ?
            GROUP BY e.id
            ORDER BY e.createdAt DESC
            LIMIT ? OFFSET ?
        `,
        [
            
            userId,            
            `%${age}%`,
            `%${position}%`,
            `%${skills}%`,
            `%${currentTeam}%`,            
            limit,
            offset,
        ],
    );

    // Recorremos todas las entradas para añadir sus fotos.
    for (const entry of entries) {
        // Obtenemos un array con todas las fotos de la entrada.
        const [videos] = await pool.query(
            `SELECT id, videoName FROM entryVideos WHERE entryId = ?`,
            [entry.id],
        );

        // Agregamos las fotos a la entrada actual.
        entry.videos = videos;

        // Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
        entry.owner = Boolean(entry.owner);

    }

    return entries;
};

export default selectAllEntriesModel;
