// Importamos el contexto.
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { Link, NavLink } from "react-router-dom";

// Importamos el css
import './UserProfilePage.css'

// Importamos el formualario
import UserProfileForm from "../../forms/UserProfileForm/UserProfileForm";

const UserProfilePage = () => {  
    // Necesitamos saber si estamos logeados
    const {authUser} = useContext(AuthContext);
    
    // Si no estamos logeados redirigimos al home
    if (!authUser) {
        return <Link to ="/" />
    };

    return (
    <>
        <main>
            <UserProfileForm/>
        </main>
    </>
    );
};

export default UserProfilePage;