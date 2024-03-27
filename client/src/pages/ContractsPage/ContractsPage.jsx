//Importamos las funciones que hacen el fetch
import { recruiterListContract } from "../../services/recruiterServices";
// Importamos el contexto y lo necesario para usarlo
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
// Importamos toast
import toast from "react-hot-toast";
//Importamos el css
import "./ContractsPage.css";
// Importamos el navigate
import { Navigate, useNavigate } from "react-router-dom";
//Creamos el componente
const ContractsPage = () => {
  const [contractPlayer, setContractPlayer] = useState([]);
  const { authToken } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Función que busca los contratos de los reclutadores.
    const fetchContract = async () => {
      try {
        // Obtenemos el contrato.
        const contract = await recruiterListContract(authToken);
        // Actualizamos las entradas en el State.
        if (contract) {
          setContractPlayer(contract);
        }
      } catch (err) {
        if (err.httpStatus === 404 && err.code === "RESOURCE_NOT_FOUND") {
          // Manejar caso de no encontrar contratos
          setContractPlayer([]);
        } else {
          // Manejar otros errores
          toast.error("There Are Not Contracts.");
          navigate("/");
        }
      }
    };

    // Llamamos a la función anterior.
    fetchContract();
  }, [authToken]);

  return (
    <>
      <main className="contract-page">
        <h2>Recruiter Contracts</h2>
        <div className="recruiter-contract">
          <h3>Player: {contractPlayer.name}</h3>
          <h3>Family: {contractPlayer.family}</h3>
          {contractPlayer.status === "pending" && (
            <p>{contractPlayer.status} 🟠</p>
          )}
          {contractPlayer.status === "accepted" && (
            <p>{contractPlayer.status} 🟢</p>
          )}
          {contractPlayer.status === "rejected" && (
            <p>{contractPlayer.status} 🔴</p>
          )}
        </div>
      </main>
    </>
  );
};

export default ContractsPage;
