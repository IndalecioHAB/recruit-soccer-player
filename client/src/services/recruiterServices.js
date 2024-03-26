// Importamos la variable de entorno
const { VITE_API_URL } = import.meta.env;

// Función para crear un contrato
export const newRecruitment = async (playerId, entryId, authToken) => {
  const newEmail = await fetch(
    `${VITE_API_URL}/entries/${entryId}/player/${playerId}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }
  );
  // Convertimos la respuesta de Node en un array js
  const body = await newEmail.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos el mensaje.
  return body.message;
};

// Función para retornar los contratos al recruiter
export const recruiterListContract = async (authToken) => {
  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/contract/recruiter`, {
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

  // Retornamos los datos de la entrada.
  return body.data.contract;
};
// Función para retornar los contratos a la familia
export const familyListContract = async (authToken) => {
  // Obtenemos una respuesta.
  const res = await fetch(`${VITE_API_URL}/contract`, {
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

  // Retornamos los datos de la entrada.
  return body.data.contract;
};
// Función que acepta un contrato
export const acceptContract = async (contractId, confirmationCode) => {
  const accept = await fetch(
    `${VITE_API_URL}/contract/${contractId}/confirm/${confirmationCode}`,
    {
      method: "PUT",
    }
  );

  // Convertimos la respuesta de Node en un array js
  const body = await accept.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos el token.
  return body.message;
};
// Función que RECHAZA un contrato
export const rejectContract = async (contractId) => {
  const accept = await fetch(`${VITE_API_URL}/contract/${contractId}/decline`, {
    method: "PUT",
  });

  // Convertimos la respuesta de Node en un array js
  const body = await accept.json();

  // Si hay algún error lo lanzamos.
  if (body.status === "error") {
    throw new Error(body.message);
  }

  // Retornamos el token.
  return body.message;
};
