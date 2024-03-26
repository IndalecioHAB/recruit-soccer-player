// Importamos el state para poder crear variables
import { useCallback, useContext, useEffect, useState } from "react";

// Importamos el contexto.
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getOwnUser } from "../../services/userServices";

const { VITE_API_URL } = import.meta.env;

const UserProfileForm = () => {
  // Importamos la funciones y variables necesarias que estan dentro del contexto
  const { authToken, authEditAvatar, authEditUser } =
    useContext(AuthContext);
  // Importamos las variables y funciones necesarias dentro de recuirterServices
  // Para el avatar del usuario
  const [avatar, setAvatar] = useState(null);
  // Para cambiar los datos de usuario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [authPlayers, setPlayersInfo] = useState("");
  const navigate = useNavigate();

    // Creamos un useEffect que haga una petición para buscar los datos del usuario cada vez que se registre un nuevo token.
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { user, players } = await getOwnUser(authToken);
          setAuthUser(user);
          setPlayersInfo(players);
        } catch (error) {
          alert(error.message);
        }
      };
  
      if (authToken) {
        fetchUser();
      }
    }, [authToken]);

  // Redirigimos al home si no estamos logeados
  if (!authUser) {
    return <Link to="/" />;
  }

  // Creamos la funcion submit para cambiar el avatar
  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const message = authEditAvatar(avatar);
    navigate("/");
  };

  // Creamos la funcion submit para editar los datos de usuario.
  const handleDataSubmit = (e) => {
    e.preventDefault();
    const message = authEditUser(username, email);
    setEmail("");
    setUsername("");
    navigate("/");
  };

  return (
    <>
      <div className="profile-form">
        <h3>{authUser.username} Profile</h3>
        <img
          src={
            authUser?.avatar
              ? `${VITE_API_URL}/${authUser.avatar}`
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

        <form onSubmit={handleDataSubmit}>
          <label htmlFor="username">Change Username:</label>
          <input
            id="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />

          <label htmlFor="username">Change Email:</label>
          <input
            id="username"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <button>Update User</button>
        </form>

        {authUser.role === "family" && (
          <div className="players">
            <h3>Players List</h3>
            <div className="row">
              {!authPlayers || authPlayers.length === 0 ? (
                <p>There Are Not Players</p>
              ) : (
                authPlayers.map((player, index) => (
                  <>
                    <div className="players-position">
                      <Link to={`/player/profile/${player.id}`}>
                        <img
                          src={
                            player?.avatar
                              ? `${VITE_API_URL}/${player.avatar}`
                              : "./default-user.png"
                          }
                        />
                      </Link>
                      <p key={index}>{player.name}</p>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfileForm;
