// Importamos los componentes.
import { Navigate } from 'react-router-dom';

// Importamos el formulario.
import NewEntryForm from '../../forms/NewEntryForm/NewEntryForm';
import { useContext } from 'react';

// Importamos el contexto
import { AuthContext } from '../../contexts/AuthContext';

// Importamos el css
import './NewEntryPage.css'

// Inicializamos el componente.
const NewEntryPage = () => {

    const {authUser} = useContext(AuthContext);

    if (!authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <NewEntryForm/>
        </main>
    );
};

export default NewEntryPage;
