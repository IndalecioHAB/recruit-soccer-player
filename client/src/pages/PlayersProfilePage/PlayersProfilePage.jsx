// Importamos el contexto.
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { Link, NavLink } from "react-router-dom";

// Importamos el formualario
import PlayersProfileForm from "../../forms/PlayersProfileForm/PlayersProfileForm";

//Importamos el css
import './PlayersProfilePage.css';

const PlayersProfilePage = () => {  
    // Necesitamos saber si estamos logeados
    const {authUser} = useContext(AuthContext);
    
    // Si no estamos logeados redirigimos al home
    if (!authUser) {
        return <Link to ="/" />
    };

    return (
    <>
        <main>
            <PlayersProfileForm/>
        </main>
    </>
    );
};

export default PlayersProfilePage;