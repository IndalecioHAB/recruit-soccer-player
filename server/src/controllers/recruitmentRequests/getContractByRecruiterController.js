// Importamos los modelos.
import selectContractByRecruiterModel from "../../models/recruitmentRequests/selectContractByRecruiterModel.js";

// Función controladora final que retorna el listado de contratos AL RECLUTADOR.
const getContractByRcruiterController = async (req, res, next) => {
  try {
    // Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
    // "user" podría ser undefined.
    const contract = await selectContractByRecruiterModel(req.user?.id);

    res.send({
      status: "ok",
      data: {
        contract,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getContractByRcruiterController;
