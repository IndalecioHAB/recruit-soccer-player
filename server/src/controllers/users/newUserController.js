// Importamos las dependencias.
import crypto from 'crypto';

// Importamos los modelos.
import insertUserModel from '../../models/users/insertUserModel.js';

// Importamos la función que envía emails.
import sendMail from '../../utilities/sendMail.js';

// Importamos la función que valida esquemas.
import validateSchema from '../../utilities/validateSchema.js';

// Importamos el esquema de Joi.
import newUserSchema from '../../schemas/users/newUserSchema.js';

// Importamos las variables de entorno.
import { CLIENT_URL } from '../../../env.js';

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
    try {
        // Validamos los datos con Joi.
        await validateSchema(newUserSchema, req.body);

        // Obtenemos los datos del body.
        const { username, email, password, role } = req.body;

        // Creamos un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        await insertUserModel(username, email, password, role, registrationCode);

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario';

        // Cuerpo del email de verificación.
        const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Reclutadores y Familias. Para activar tu cuenta,
            haz clic en el enlace e introduce el siguiente codigo: ${registrationCode}

            <a href="${CLIENT_URL}/validate">¡Activar mi cuenta!</a>
        `;

        // Enviamos el email de verificación al usuario.
        await sendMail(email, emailSubject, emailBody);

        res.status(201).send({
            status: 'ok',
            message:
                'Please, Verify your email to validate this user',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
