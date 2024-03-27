// Importamos el state
import { useContext, useState } from "react";

// Importamos el contexto.
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {

    // Importamos la funcion login que esta en el contexto
    const {authLogin, authUser} = useContext(AuthContext);

    const Navigate = useNavigate();

    if (authUser) return <Navigate to='/profile' />;

    // Hacemos las variables de cada input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función controladora del evento Submit
    const handleLoginUser = async (e) => {
        e.preventDefault();
        await authLogin(email, password);
        Navigate('/');
    }

    return (
        <>
            <main>
                <div className="login-form">

                    <h2>Log In</h2>

                    <form onSubmit={handleLoginUser}>
                        <label htmlFor="username">Email:</label>
                        <input type="text" id="username" value={email}
                         onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password}
                         onChange={(e) => setPassword(e.target.value)} required />

                        <div><button>Iniciar Sesión</button></div>
                    </form>

                </div>
            </main>
        </>
    );

}

export default LoginForm;