// Importamos las rutas para la paginación.
import { useContext, useState } from "react";

// Traemos la funcion que hace el fetch
import { userRegister } from "../../services/userServices";

// Importamos el contexto.
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

// Creamos la pagina Register Page
const RegisterForm = () => {
  // Cogemos las funciones que necesitamos del contexto
  const { authRegister } = useContext(AuthContext);
  // Creamos la variable navigate
  const navigate = useNavigate();

  // Hacemos una variable por cada evento change
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPass, setRepeatedPass] = useState("");

  // Hacemos la funcion Submit
  const handleSubmitRegister = async (e) => {
    // Prevenimos el comportamiento por defecto
    e.preventDefault();

    // Ejecutamos la función Register del archivo userService
    if (repeatedPass === password) {
      await authRegister(username, email, role, password);
    } else {
      alert("Las contraseñas no coinciden");
    }
    navigate("/users/validate");
    //Vaciamos los valores del formulario
    setUsername("");
    setEmail("");
    setRole("");
    setRepeatedPass("");
    setPassword("");
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmitRegister}>
        <label htmlFor="username">
          {" "}
          Username:
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label htmlFor="email">
          {" "}
          Email:
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="role">
          {" "}
          Role:
          <select
            id="role"
            name="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="choose">Choose your role</option>
            <option value="family">Family</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>

        <label htmlFor="password">
          {" "}
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label htmlFor="repeatedPass">
          {" "}
          Repeated Password:
          <input
            type="password"
            onChange={(e) => setRepeatedPass(e.target.value)}
            required
          />
        </label>

        <button>Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
