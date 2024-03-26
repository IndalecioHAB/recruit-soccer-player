// Importamos los modelos.
import selectContractByIdModel from '../../models/recruitmentRequests/selectContractByIdModel.js';
// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora final que retorna el listado de contratos A LAS FAMILIAS.
const getContractController = async (req, res, next) => {
    try {
        const pool = await getPool();

        // Obtenemos la entrada. Es importante indicarle a JavaScript que la propiedad
        // "user" podría ser undefined.
        const contract = await selectContractByIdModel(req.user?.id);
        
        res.send({
            status: 'ok',
            data: {
                contract,              
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getContractController;