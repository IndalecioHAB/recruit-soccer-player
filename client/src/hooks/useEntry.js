// Importamos los hooks.
import { useState, useEffect } from "react";

// Importamos la función toast.
import toast from "react-hot-toast";

// Importamos los servicios.
import { selectEntryByIdService } from "../services/entriesServices";

// Inicializamos el hook.
const useEntry = (entryId) => {
  // Declaramos una variable en el State para almacenar la entrada.
  const [entry, setEntry] = useState(null);

  // Utilizamos un useEffect para buscar la entrada cuando se monta un componente.
  useEffect(() => {
    // Función que busca las entradas.
    const fetchEntry = async () => {
      try {
        // Obtenemos la entrada.
        const entry = await selectEntryByIdService(entryId);

        // Actualizamos las entradas en el State.
        setEntry(entry);
      } catch (err) {
        toast.error(err.message);
      }
    };

    // Llamamos a la función anterior.
    fetchEntry();
  }, [entryId]);

  // Función que actualiza la entrada en el State para agregar videos.
  const addEntryVideo = (newVideo) => {
    // Creamos un nuevo array de fotos donde figuren las fotos que ya existan, más las nueva foto.
    const updatedVideos = [...entry.videos, newVideo];

    // Actualizamos la entrada en el State.
    setEntry({
      ...entry,
      videos: updatedVideos,
    });
  };

  // Función que actualiza la entrada en el State para eliminar un video.
  const deleteEntryVideo = (videoId) => {
    // Creamos un nuevo array de fotos donde filtraremos las fotos cuyo ID no coincida con la
    // foto que queremos eliminar. De esta forma solo quedarán las fotos que NO queremos eliminar.
    const updatedVideos = entry.videos.filter((video) => video.id !== videoId);

    // Actualizamos la entrada en el State.
    setEntry({
      ...entry,
      viddeos: updatedVideos,
    });
  };

  // Retornamos los valores deseados.
  return { entry, addEntryVideo, deleteEntryVideo };
};

export default useEntry;
