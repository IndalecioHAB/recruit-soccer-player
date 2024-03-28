//Importamos las funciones que hacen el fetch
import {
  familyListContract,
  acceptContract,
  rejectContract,
} from "../../services/recruiterServices";

import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";

import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

//Importamos el css
import "./FamilyContractsPage.css";

//Creamos el componente
const FamilyContractsPage = () => {
  // Creamos las variables que necesitamos tanto si son de formualrio
  // como si se obtienen de los services o del navigate
  const [contractPlayer, setContractPlayer] = useState([]);
  const [confirmationCode, setConfirmationCode] = useState("");
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Función que busca los contratos de los familiares.
    const fetchContract = async () => {
      try {
        // Obtenemos el contrato.
        const contract = await familyListContract(authToken);
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

  //Funcion que acepta un contrato
  const handleAccept = async (contractId) => {
    try {
      await acceptContract(contractId, confirmationCode);
      toast.success("Contract Accpeted");
      setConfirmationCode("");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Funcion que rechaza un contrato
  const handDeclineContract = async (contractId) => {
    try {
      const message = await rejectContract(contractId);
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <main>
        <div className="contract">
          <h2>Family Contracts</h2>
          {contractPlayer.map((contract) => {
            return (
              <div className="contract-list" key={contract.id}>
                <h4>Player: {contract.name}</h4>
                <h4>Recruiter: {contract.recruiter}</h4>
                {contract.status === "pending" && <p>{contract.status} 🟠</p>}
                {contract.status === "accepted" && <p>{contract.status} 🟢</p>}
                {contract.status === "rejected" && <p>{contract.status} 🔴</p>}
                {contract.status === "pending" && (
                  <>
                    <form
                      className="accept-contract"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAccept(contract.id);
                      }}
                    >
                      <label htmlFor="code">
                        Introduce your confirmation code:
                        <input
                          type="text"
                          name="code"
                          id="code"
                          onChange={(e) => setConfirmationCode(e.target.value)}
                        />
                      </label>
                      <button>Accept Contract</button>
                    </form>
                    <button onClick={() => handDeclineContract(contract.id)}>
                      Decline Contract
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default FamilyContractsPage;
