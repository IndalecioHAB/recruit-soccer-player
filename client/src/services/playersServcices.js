// Importamos la variable VITE para los fetch
const {VITE_API_URL} = import.meta.env;

// Funcion para crear un jugador
export const createPlayer =  async (token, name, age, position, skills, currentTeam) => {

    const newPlayer = await fetch(`${VITE_API_URL}/users/player`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            name,
            age,
            position,
            skills,
            currentTeam,
        }),
    });

        // Convertimos la respuesta de Node en un array js
        const body = await newPlayer.json();

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }
        
        // Retornamos el token.
        return body.data.player;
    
}

// Funcion para editar un jugador
export const editPlayer = async (token, playerId, name, age, position, skills, currentTeam) => {
    const newData = await fetch(`${VITE_API_URL}/users/player/${playerId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            name,
            age,
            position,
            skills,
            currentTeam,
        }),
    });

    // Obtenemos el body.
    const body = await newData.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }

    // Retornamos los datos del usuario actualizados.
    return body.data.message;
}
// Funcion para editar el avatar de un jugador.
export const editPlayerAvatar = async (token, playerId, avatar) => {

    // Creamos un objeto FormData para almacenar el archivo antes de enviarlo.
    const formData = new FormData();

    // Agregamos el avatar al formData.
    formData.append('avatar', avatar);

    const avatarName = await fetch(`${VITE_API_URL}/users/player/${playerId}/avatar`, {
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

// Funcion que borra un jugador
export const deletePlayer = async (token, playerId) => {
    
    const deletePlayer = await fetch(`${VITE_API_URL}/users/player/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,          
        }, })

    // Convertimos la respuesta de Node en un array js
    const body = await deletePlayer.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    
    // Retornamos el token.
    return body.message;
}
// Funcion que obtiene jugador por id
export const getPlayer = async (token, playerId) => {
    
    const getOwnPlayer = await fetch(`${VITE_API_URL}/users/player/${playerId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,          
        }, })

    // Convertimos la respuesta de Node en un array js
    const body = await getOwnPlayer.json();

    // Si hay algún error lo lanzamos.
    if (body.status === 'error') {
        throw new Error(body.message);
    }
    
    // Retornamos el token.
    return body.data.player;
}
