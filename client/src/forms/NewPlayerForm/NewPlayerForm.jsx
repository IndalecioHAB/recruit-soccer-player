// Importamos las rutas para la paginación.
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Traemos la funcion que hace el fetch
import { userRegister } from "../../services/userServices";

// Importamos el contexto.
import { AuthContext } from "../../contexts/AuthContext";

// Creamos la pagina Register Page
const NewPlayerForm = () => {
  const Navigate = useNavigate();

  // Cogemos las funciones que necesitamos del contexto
  const { authRegister, authCreatePlayer, authToken } = useContext(AuthContext);

  // Para crear un nuevo jugador
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");

  //Creamos la funcion submit para crear un jugador
  const handleNewPlayerSubmit = async (e) => {
    //Prevenimos el comportamiento por defecto
    e.preventDefault();
    // Ejecutamos la funcion que crea el jugador
    await authCreatePlayer(authToken, name, age, position, skills, currentTeam);
    // Borramos los campos del formulario
    setName("");
    setAge("");
    setPosition("");
    setSkills("");
    setCurrentTeam("");
    //Redireccionamos al perfil
    Navigate("/");
  };

  return (
    <>
      <form className="new-player" onSubmit={handleNewPlayerSubmit}>
        <h3>New Player</h3>

        <label htmlFor="playerName">Player Name:</label>
        <input
          id="playerName"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="text"
          onChange={(e) => {
            setAge(Number(e.target.value));
          }}
        />

        <label htmlFor="position">Player Position:</label>
        <select
          id="position"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        >
          <option value="">Choose Your Position</option>
          <option value="Delantero">Forward</option>
          <option value="Centrocampista">Midfielder</option>
          <option value="Defensa">Defender</option>
          <option value="Portero">Goalkeeper</option>
        </select>

        <label htmlFor="skills"> Player Skills:</label>
        <textarea
          name="skills"
          id="skills"
          cols="30"
          rows="10"
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        ></textarea>

        <label htmlFor="currentTeam">Current Team:</label>
        <input
          id="currentTeam"
          type="text"
          onChange={(e) => {
            setCurrentTeam(e.target.value);
          }}
        />

        <button>Create Player</button>
      </form>
    </>
  );
};

export default NewPlayerForm;
