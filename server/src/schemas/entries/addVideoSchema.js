// Importamos joi.
import joi from 'joi';

// Importamos el esquema que verifica una imagen.
import videoSchema from '../../schemas/entries/videoSchema.js';

// Creamos el esquema de Joi.
const addVideoSchema = joi.object({
    video: videoSchema.required(),
});

export default addVideoSchema;
