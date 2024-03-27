// Importamos los estilos
import "./Header.css";
// Traemos el contexto y la manera de usarlo
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

// Traemos la variable de entorno
const { VITE_API_URL } = import.meta.env;

// Importamos lo que necesitamos de REACT ROUTER DOM
import { Link, NavLink } from "react-router-dom";

// Creamos el componente Header
const Header = () => {
  const { authUser, authLogout } = useContext(AuthContext);

  return (
    <>
      <header>
        <div className="header-info">
          <Link to="/">
            <div className="info">
              <h2>Footbal Scout </h2>
              <img src="./header-logo.png" alt="Default Logo" />
            </div>
          </Link>
        </div>
        <div className="user-info">
          <h4>{authUser ? `@${authUser.username}` : "Bienvenido"}</h4>
          <img
            src={
              authUser?.avatar
                ? `${VITE_API_URL}/${authUser.avatar}`
                : "./default-user.png"
            }
            alt="User Logo"
          />
        </div>
        <div className="header-nav">
          <nav>
            <ul className="header-menu">
              {!authUser ? (
                <>
                  <Link to="/register">
                    <li>Register</li>
                  </Link>
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <Link to="/">
                    <button onClick={authLogout}>Logout</button>
                  </Link>
                  {authUser.role === "family" && (
                    <>
                      <Link to="/player">
                        <li>Create Player</li>
                      </Link>
                      <Link to="/family-contracts">
                        <li>Contracts</li>
                      </Link>
                      <Link to="/entry">
                        <li>New Post</li>
                      </Link>
                    </>
                  )}
                  {authUser.role === "recruiter" && (
                    <>
                      <Link to="/recruiter-contracts">
                        <li>Contracts</li>
                      </Link>
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
