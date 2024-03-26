// Importamos la función que retorna un pool de conexiones.
import getPool from './getPool.js';

// Función que creará las tablas de la base de datos.
const createTables = async () => {
    try {
        // Obtenemos el pool de conexiones.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            'DROP TABLE IF EXISTS RecruitmentRequests, entryVideos, entry, players , users',
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                role ENUM('family', 'recruiter') DEFAULT 'family',
                registrationCode CHAR(30),
                isActive BOOLEAN DEFAULT false,                
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP                
            )	
        `);

        // Creamos la tabla de jugadores.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS players (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                age INT,
                position VARCHAR(50),
                skills TEXT,
                currentTeam VARCHAR(100),
                avatar VARCHAR(100),
                userId INT UNSIGNED NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Creamos la tabla de entradas.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entry (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                title TEXT,
                description TEXT,
                place TEXT,
                playerId INT UNSIGNED NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (playerId) REFERENCES players(id),
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Tabla de videos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS entryVideos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                entryId INT UNSIGNED NOT NULL,
                playerId INT UNSIGNED NOT NULL,
                videoName TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (entryId) REFERENCES entry(id),
                FOREIGN KEY (playerId) REFERENCES players(id)
            )
        `);

        // Tabla de reclutamiento.
        await pool.query(`
        CREATE TABLE IF NOT EXISTS RecruitmentRequests (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            playerId INT UNSIGNED NOT NULL,
            familyId INT UNSIGNED NOT NULL,
            recruiterId INT UNSIGNED NOT NULL,
            status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
            confirmationCode VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (playerId) REFERENCES players(id),
            FOREIGN KEY (familyId) REFERENCES users(id),
            FOREIGN KEY (scoutId) REFERENCES users(id)
        )
    `);

        console.log('¡Tablas creadas!');

        // Cerramos el proceso con código 0 indicando que todo ha ido bien.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1 indicando que hubo un error.
        process.exit(1);
    }
};

// Llamamos a la función anterior.
createTables();
