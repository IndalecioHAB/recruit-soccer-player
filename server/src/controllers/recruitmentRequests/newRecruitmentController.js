// Importamos las dependencias.
import crypto from "crypto";

// Importamos los modelos.
import selectEntryByIdModel from "../../models/entries/selectEntryByIdModel.js";

// Importamos la función que envía emails.
import sendMail from "../../utilities/sendMail.js";

// Importamos las variables de entorno.
import { CLIENT_URL } from "../../../env.js";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los errores que necesitamos
import { notFoundError } from "../../services/errorService.js";
import { userAlreadyHasContract } from "../../services/errorService.js";

// Función controladora final que crea un nuevo contrato.
const newRecruitmentController = async (req, res, next) => {
  try {
    // Obtenemos los req.params
    const { entryId, playerId } = req.params;

    // Lanzamos los errores
    if (!entryId) {
      notFoundError("entryId");
    }

    if (!playerId) {
      notFoundError("playerId");
    }

    //Traemos la conexion
    const pool = await getPool();
    // Consulta rapida para saber si ya hay un contrato
    const [prevContract] = await pool.query(
      `SELECT playerId, recruiterId FROM RecruitmentRequests WHERE recruiterId = ? AND playerId = ?`,
      [req.user.id, playerId]
    );

    if (prevContract.length > 0) {
      userAlreadyHasContract();
    }

    // Obtenemos la entrada donde aparecen todos los datos que necesitamos
    const entry = await selectEntryByIdModel(entryId, req.user?.id);

    // Consulta rapida para saber el nombre del reclutador
    const [recruiterName] = await pool.query(
      `SELECT username FROM users WHERE id = ?`,
      [req.user.id]
    );

    // Consulta rapida para obtener el email de la familia sin que se vea en React
    const [familyEmail] = await pool.query(
      `SELECT email FROM users WHERE id = ?`,
      [entry.userId]
    );

    // Consulta rapida para obtener el nombre de los jugadores que aparecen en la entrada
    const [playerName] = await pool.query(
      `SELECT name FROM players WHERE id = ?`,
      [playerId]
    );

    // Creamos un código de contrato.
    const contractCode = crypto.randomBytes(15).toString("hex");

    // Guardamos la info en la base de datos
    await pool.query(
      `INSERT INTO RecruitmentRequests (playerId, familyId, recruiterId, status, confirmationCode) VALUES (?, ?, ?, ?)`,
      [playerId, entry.userId, req.user.id, "pending", contractCode]
    );

    // Asunto del email de verificación.
    const emailSubject = `Solicitud de contratacion para el jugador ${playerName[0].name}`;

    // Cuerpo del email de verificación.
    const emailBody = `
            ¡Estimada Familia ${entry.username}!

            Me llamo ${recruiterName[0].username} y estoy interesado en reclutar a su jugador ${playerName[0].name}. Para aceptar el contrato, introduce el codigo en el apartado Contratos de la web:

            ${contractCode}
        `;

    // Enviamos el email de verificación al usuario.
    await sendMail(familyEmail[0].email, emailSubject, emailBody);

    res.status(201).send({
      status: "ok",
      message: "New Contract Sended",
    });
  } catch (err) {
    next(err);
  }
};

export default newRecruitmentController;
