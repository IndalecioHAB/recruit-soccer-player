// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import videoSchema from './videoSchema.js';

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js';

// Creamos el esquema de Joi.
const newVideoSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
    place: joi.string().min(3).max(30).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(500)
        .required()
        .messages(joiErrorMessages),
    video1: videoSchema.optional(),
    video2: videoSchema.optional(),
    video3: videoSchema.optional(),
});

export default newVideoSchema;
