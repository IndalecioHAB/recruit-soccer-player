// Importamos las prop-types.
import PropType from "prop-types";

// Importamos la función que crea un contexto y sus agregados.
import { createContext, useEffect, useState } from "react";

// Creamos el contexto.
export const AuthContext = createContext(null);

// Importamos toast
import toast from "react-hot-toast";

// Importamos las funciones que hacen los fetch
import {
  userRegister,
  userLogin,
  getOwnUser,
  editAvatar,
  editUser,
} from "../services/userServices";
import {
  createPlayer,
  editPlayer,
  editPlayerAvatar,
  deletePlayer,
} from "../services/playersServcices";

// Creamos el componente Provider
export const AuthProvider = ({ children }) => {
  // Creamos la variable donde pondremos el token
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );
  const [authUser, setAuthUser] = useState(null);
  const [authPlayers, setAuthPlayers] = useState(null);
  const [entries, setEntries] = useState([]);

  // Creamos un useEffect que haga una petición para buscar los datos del usuario cada vez que se registre un nuevo token.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, players } = await getOwnUser(authToken);
        setAuthUser(user);
        setAuthPlayers(players);
      } catch (error) {
        alert(error.message);
      }
    };

    if (authToken) {
      fetchUser();
    }
  }, [authToken]);

  // Creamos la funcion de registro.
  const authRegister = async (username, email, role, password) => {
    try {
      const message = await userRegister(username, email, role, password);
      alert("Usuario Creado");
    } catch (error) {
      alert(error.message);
    }
  };

  // Creamos la funcion de login
  const authLogin = async (email, password) => {
    try {
      // Ejecutamos el fetch
      const token = await userLogin(email, password);

      //Guardamos el token en la variable del state
      setAuthToken(token);
      // Guardamos el token en el localStorage
      localStorage.setItem("token", token);
    } catch (error) {
      alert(error.message);
    }
  };

  // Creamos la funcion de cerrar sesion
  const authLogout = () => {
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem("token");
  };

  // Creamos la funcion de editar avatar
  const authEditAvatar = async (avatar) => {
    // Obtenemnos la info del nuevo avatar
    const avatarName = await editAvatar(avatar, authToken);
    // Modificamos los datos del array original
    setAuthUser({ ...authUser, avatar: avatarName });
    toast.success("User Avatar Updated");
  };

  // Funcion para editar email y nombre de usuario
  const authEditUser = async (username, email) => {
    const newData = await editUser(username, email, authToken);
    setAuthUser({
      ...authUser,
      username: newData.username ? username : authUser.username,
      email: email ? newData.email : authUser.email,
    });
    toast.success("User Updated");
  };

  // Creamos la funcion que crea un nuevo jugador
  const authCreatePlayer = async (
    token,
    name,
    age,
    position,
    skills,
    currentTeam
  ) => {
    try {
      // Ejecutamos el fetch
      const newPlayer = await createPlayer(
        token,
        name,
        age,
        position,
        skills,
        currentTeam
      );
      toast.success("Player Created");
      setAuthPlayers([...authPlayers, newPlayer]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Creamos la funcion que edita un jugador concreto
  const authEditPlayer = async (
    token,
    playerId,
    name,
    age,
    position,
    skills,
    currentTeam
  ) => {
    try {
      // Ejecutamos el fetch
      const newPlayer = await editPlayer(
        token,
        playerId,
        name,
        age,
        position,
        skills,
        currentTeam
      );
      toast.success("Player Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Creamos la funcion que edita el avatar de un jugador concreto
  const authEditPlayerAvatar = async (token, playerId, avatar) => {
    try {
      // Ejecutamos el fetch
      const avatarName = await editPlayerAvatar(token, playerId, avatar);
      toast.success("Player Avatar Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Creamos la funcion que borra un jugador
  const authDeletePlayer = async (playerId) => {
    try {
      await deletePlayer(authToken, playerId);
      toast.success("Player Deleted");
      setAuthPlayers(authPlayers.filter((player) => player.id !== playerId));
    } catch (error) {
      toast.success(error.message);
    }
  };

  // Exportamos las funciones que necesitamos
  return (
    <AuthContext.Provider
      value={{
        authRegister,
        authLogin,
        authLogout,
        authToken,
        authUser,
        authPlayers,
        authEditUser,
        authEditAvatar,
        authCreatePlayer,
        authEditPlayer,
        authEditPlayerAvatar,
        authDeletePlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Validamos las props.
AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};
