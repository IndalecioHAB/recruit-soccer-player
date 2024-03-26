// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para actualizar el nombre de usuario y/o el email.
const updatePlayerModel = async (name, age, position, skills, currentTeam, userId, playerId) => {
    const pool = await getPool();    

    // Actualizamos los datos del jugador.
    if (name) {
        await pool.query(`UPDATE players SET name = ? WHERE id = ? AND userId = ?`, [
            name,
            playerId,
            userId,
        ]);
    }

    if (age) {        
        await pool.query(`UPDATE players SET age = ? WHERE id = ? AND userId = ?`, [
            age,
            playerId,
            userId,
        ]);
    }

    if (position) {

        // Actualizamos el avatar del usuario.
        await pool.query(`UPDATE players SET position = ? WHERE id = ? AND userId = ?`, [
            position,
            playerId,
            userId,
        ]);
    }

    if (skills) {

        // Actualizamos el avatar del usuario.
        await pool.query(`UPDATE players SET sskills = ? WHERE id = ? AND userId = ?`, [
            skills,
            playerId,
            userId,
        ]);
    }

    if (currentTeam) {

        // Actualizamos el avatar del usuario.
        await pool.query(`UPDATE players SET currentTeam = ? WHERE id = ? AND userId = ?`, [
            currentTeam,
            playerId,
            userId,
        ]);
    
    };

};


export default updatePlayerModel;
