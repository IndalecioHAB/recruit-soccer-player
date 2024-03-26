// Importamos la variable VITE para los fetch
const {VITE_API_URL} = import.meta.env;

// Aqui haremos las funciones que contienen los fecth:

// Funcion de registro
export const userRegister = async (username, email, role, password) => {

    // Hacemos el fecth tipo post, indicamos en el body los datos que vienen del formulario
    const register = await fetch(`${VITE_API_URL}/users/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            role,
            password,
        }),
    });

    // Convertimos la respuesta de Node en un array js
    const body = await register.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    
    // Retornamos el mensagedel body que indica que todo ha ido bien.
    return body.message;
}

// Función que realiza una petición al servidor para activar un usuario.
export const activateUserService = async (registrationCode) => {
    // Obtenemos una respuesta.
    const res = await fetch(
        `${VITE_API_URL}/users/validate/${registrationCode}`,
        {
            method: 'put',
        }
    );

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
};

// Funcion de login
export const userLogin = async (email, password) => {

    const login = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

        // Convertimos la respuesta de Node en un array js
        const body = await login.json();

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }
        
        // Retornamos el token.
        return body.data.token;

};

//Función de datos privados del usuario
export const getOwnUser = async (token) => {
    
    // Hacemos el fetch mandando el token
    const user = await fetch(`${VITE_API_URL}/users`, {
        headers: {
            Authorization: token,
        },
    });

    // Convertimos la respuesta de Node en un array js
    const body = await user.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    
    // Retornamos el token.
    return {
        user: body.data.user,
        players: body.data.players 
    }
}
//Funcion  para cambiar el avatar desde la pagina de perfil
export const editAvatar = async (avatar, token) => {

    // Creamos un objeto FormData para almacenar el archivo antes de enviarlo.
    const formData = new FormData();

    // Agregamos el avatar al formData.
    formData.append('avatar', avatar);

    // Obtenemos el response.
    const avatarName = await fetch(`${VITE_API_URL}/users/avatar`, {
        method: 'put',
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    // Convertimos la respuesta de Node en un array js
    const body = await avatarName.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    
    // Retornamos el token.
    return body.data.avatar.name;  
}

// Funcion para modificar los datos del usuario desde la pagina de perfil
export const editUser = async (username, email, token) => {
    const newData = await fetch(`${VITE_API_URL}/users`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            username,
            email,
        }),
    });

    // Obtenemos el body.
    const body = await newData.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos los datos del usuario actualizados.
    return body.data.user;

}