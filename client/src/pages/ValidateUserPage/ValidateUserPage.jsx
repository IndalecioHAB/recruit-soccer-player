// Importamos los hooks.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Importamos los servicios.
import { activateUserService } from "../../services/userServices";

// Importamos el CSS.
import './ValidateUserPage.css';

// Inicializamos el componente.
const ValidateUserPage = () => {
  // Obtenemos la función navigate.
  const navigate = useNavigate();

  // Obtenemos el path param con el código de registro.
  const [registrationCode, setRegistrationCode] = useState("");

  // Realizamos el fetch.
  const handleActivateUser = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del envío del formulario
    try {
      await activateUserService(registrationCode);
      // Si todo va bien redirigimos a login.
      toast.success("User Activated");
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main>
      <h2>Activate Your User</h2>
      <form className="validate-user" onSubmit={handleActivateUser}>
        <label>          
          Introduce Your Activation Code:
          <input
            type="text"
            onChange={(e) => setRegistrationCode(e.target.value)}
          />
        </label>
        <button>Activate User</button>
      </form>
    </main>
  );
};

export default ValidateUserPage;
