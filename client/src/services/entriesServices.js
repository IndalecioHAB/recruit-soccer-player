// Importamos la variable VITE para los fetch
const { VITE_API_URL } = import.meta.env;

// Función que realiza una petición al servidor para obtener todas las entradas.
export const selectAllEntries = async (searchParams) => {
  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/entries?${searchParams}`);

  // Obtenemos el body.
  const body = await res.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos la propiedad data dentro de la cuál estarán las entradas, la página siguiente y anterior
  // entre otras cosas.
  return body.data;
};

// Función para obtener los datos de una entrada con un ID dado.
export const selectEntryByIdService = async (entryId) => {
  try {
    // Obtenemos una respuesta.
    const res = await fetch(`${VITE_API_URL}/entries/${entryId}`);

    // Obtenemos el body.
    const body = await res.json();

    // Si hay algún error lo lanzamos.
    if (body.status === "error") {
      throw new Error(body.message);
    }

    // Retornamos los datos de la entrada.

    return body.data.entry;
  } catch (error) {
    // Capturamos y lanzamos cualquier error que ocurra durante la solicitud.
    throw new Error("Error al obtener los datos de la entrada");
  }
};

// Función que realiza una petición al servidor para crear una nueva entrada.
export const insertEntryService = async ({
  title,
  place,
  description,
  videos,
  authToken,
  playerId,
}) => {
  // Creamos un FormData.
  const formData = new FormData();

  // Pusheamos las propiedades necesarias al form data.
  formData.append("title", title);
  formData.append("place", place);
  formData.append("description", description);

  // Recorremos el array de fotos y las pusheamos.
  for (let i = 0; i < videos.length; i++) {
    formData.append(`video${i + 1}`, videos[i]);
  }

  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/entries/${playerId}`, {
    method: "post",
    headers: {
      Authorization: authToken,
    },
    body: formData,
  });

  // Obtenemos el body.
  const body = await res.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos el mensaje de éxito.
  return body.message;
};
// Función que realiza una petición al servidor para agregar un video a una entrada existente.
export const insertEntryVideoService = async (video, entryId, authToken) => {
  // Creamos el FormData.
  const formData = new FormData();

  // Agregamos la foto.
  formData.append("video", video);

  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/entries/${entryId}/videos`, {
    method: "post",
    headers: {
      Authorization: authToken,
    },
    body: formData,
  });

  // Obtenemos el body.
  const body = await res.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos los datos de la nueva foto y el mensaje.
  return {
    message: body.message,
    newVideo: body.data.video,
  };
};
// Función que realiza una petición al servidor para borrar un VIDEO de una entrada.
export const deleteEntryVideoService = async (entryId, videoId, authToken) => {
  // Obtenemos una respuesta.
  const res = await fetch(
    `${VITE_API_URL}/entries/${entryId}/videos/${videoId}`,
    {
      method: "delete",
      headers: {
        Authorization: authToken,
      },
    }
  );

  // Obtenemos el body.
  const body = await res.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  return body.message;
};
// Función que realiza una petición al servidor para borrar una entrada.
export const deleteEntryService = async (authToken, entryId) => {
  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/entries/${entryId}`, {
    method: "delete",
    headers: {
      Authorization: authToken,
    },
  });

  // Obtenemos el body.
  const body = await res.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  return body.message;
};