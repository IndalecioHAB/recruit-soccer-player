// Importamos las dependencias.
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { UPLOADS_DIR } from '../../env.js';
import { saveFileError, deleteFileError } from './errorService.js';

// Función que guarda un video en la carpeta de subida de archivos.
export const saveVideo = async (file) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);

        // Creamos la carpeta de subida de archivos si no existe.
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // Generamos un nombre único para el video.
        const videoName = `${crypto.randomUUID()}.mp4`; // Puedes cambiar la extensión según tus necesidades.

        // Ruta absoluta donde almacenaremos el video.
        const videoPath = path.join(uploadsDir, videoName);

        // Guardamos el video en la carpeta de subida de archivos.
        await fs.writeFile(videoPath, file.data);

        // Retornamos el nombre generado.
        return videoName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

// Función que elimina un video de la carpeta de subida de archivos.
export const deleteVideo = async (videoName) => {
    try {
        // Ruta absoluta al archivo de video que queremos eliminar.
        const videoPath = path.join(process.cwd(), UPLOADS_DIR, videoName);

        // Comprobamos si el video existe.
        try {
            await fs.access(videoPath);
        } catch {
            // Si el video no existe, finalizamos la función.
            return;
        }

        // Eliminamos el archivo de video.
        await fs.unlink(videoPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};
