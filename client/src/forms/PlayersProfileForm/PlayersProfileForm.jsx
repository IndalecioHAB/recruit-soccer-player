// Importamos el state para poder crear variables
import { useContext, useEffect, useState } from "react";

// Importamos el contexto.
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Usamos el dato de los parametros
import { useParams } from "react-router-dom";

// Importamos las variables de entorno
const { VITE_API_URL } = import.meta.env;

import toast from "react-hot-toast";
import { getPlayer } from "../../services/playersServcices";

const PlayersProfileForm = () => {
  // Obtenemos el param que pasamos a traves del link
  const { playerId } = useParams();

  // Creamos un navigate para redireccionar dentro de la funcion controladora
  const Navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState([]);

  // Importamos la funciones necesarias que estan dentro del contexto
  const {
    authUser,
    authPlayers,
    authToken,
    authEditAvatar,
    authEditPlayer,
    authEditPlayerAvatar,
    authDeletePlayer,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const player = await getPlayer(authToken, playerId);
        setCurrentPlayer(player);
      } catch (error) {
        alert(error.message);
      }
    };

    if (authToken) {
      fetchPlayer();
    }
  }, []);

  // Para el avatar del jugador
  const [avatar, setAvatar] = useState(null);

  // Para cambiar los datos del jugador
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");

  // Redirigimos al home si no estamos logeados
  if (!authUser || authUser.role === "recuirter") {
    return <Link to="/" />;
  }

  // Creamos la funcion submit para cambiar el avatar
  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const message = await authEditPlayerAvatar(authToken, playerId, avatar);
    Navigate("/");
  };

  //Creamos la funcion submit para editar un jugador
  const handleEditPlayerSubmit = async (e) => {
    //Prevenimos el comportamiento por defecto
    e.preventDefault();
    // Ejecutamos la funcion que crea el jugador
    const message = await authEditPlayer(
      authToken,
      playerId,
      name,
      age,
      position,
      skills,
      currentTeam
    );
    // Borramos los campos del formulario
    setName("");
    setAge("");
    setPosition("");
    setSkills("");
    setCurrentTeam("");
    //Redireccionamos al perfil
    Navigate("/profile");
  };

  // Creamos la funcion que borra un jugador
  const handleDeletePlayerSubmit = async (e) => {
    try {
      e.preventDefault();
      await authDeletePlayer(playerId);
      Navigate("/profile");
    } catch (error) {
      toast.success(error.message);
    }
  };

  return (
    <>
      <div className="player-form">
        {authPlayers && (
          <>
            <h3>{currentPlayer.name} Profile</h3>
            <img
              src={
                authUser?.avatar
                  ? `${VITE_API_URL}/${currentPlayer.avatar}`
                  : "./default-user.png"
              }
              alt="User Logo"
            />

            <form onSubmit={handleAvatarSubmit}>
              <input
                type="file"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
                required
              />
              <button>Update Avatar</button>
            </form>

            <form onSubmit={handleEditPlayerSubmit}>
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

              <button>Update Player</button>
            </form>

            <form onSubmit={handleDeletePlayerSubmit}>
              <button>Delete Player</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default PlayersProfileForm;
