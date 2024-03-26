// Importamos los hooks.
import { useState, useEffect, useContext } from "react";

// Importamos la función toast.
import toast from "react-hot-toast";

import { AuthContext } from "../contexts/AuthContext";

// Inicializamos el hook.
const useContract = () => {
  // Declaramos una variable en el State para almacenar las entradas.
  const [familyContract, setFamilyContract] = useState([]);
  const [familyContractPlayer, setFamilyContractPlayer] = useState([]);

  const { authToken } = useContext(AuthContext);

  //   useEffect(() => {
  //     // Función que busca los contratos de la familia
  //     const fetchContract = async () => {
  //       try {
  //         // Obtenemos el contrato.
  //         const { familyContract, familyPlayer } = await familyListContract(
  //           authToken
  //         );

  //         // Actualizamos las entradas en el State.
  //         setFamilyContract(familyContract);
  //         setFamilyContractPlayer(familyPlayer);
  //       } catch (err) {
  //         toast.error(err.message);
  //       }
  //     };

  //     // Llamamos a la función anterior.
  //     fetchContract();
  //   }, [familyContract]);

  // Retornamos los valores deseados.
  return {};
};

export default useContract;
