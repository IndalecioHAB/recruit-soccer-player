// Importamos joi.
import joi from 'joi';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../../schemas/joiErrorMessages.js';

// Creamos un esquema para validar imágenes. De esta forma podremos reutilizar este esquema
// en los esquemas de validación de los endpoints que requieran imágenes.
const videoSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('video/mp4', 'video/x-msvideo', 'video/x-flv')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(5000000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

export default videoSchema;
