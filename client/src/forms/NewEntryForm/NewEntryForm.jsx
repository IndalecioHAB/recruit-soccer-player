// Importamos los hooks.
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importamos la función toast.
import toast from "react-hot-toast";

// Traemos los datos del usuario usando contexto
import { AuthContext } from "../../contexts/AuthContext";

// Importamos la funcion que crea una entrada
import { insertEntryService } from "../../services/entriesServices";

// Inicializamos el componente.
const NewEntryForm = () => {
  // Importamos la función "navigate".
  const navigate = useNavigate();

  // Importamos las funciones y variables que necesitemos
  const { authToken, authPlayers } = useContext(AuthContext);

  // Declaramos una variable en el State por cada elemento del formulario.
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [videos, setVideos] = useState([]);

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Creamos la entrada y obtenemos el mensaje.
      const message = await insertEntryService({
        title,
        place,
        description,
        videos,
        authToken,
        playerId,
      });

      // Mostramos un mensaje indicando que todo ha ido bien.
      toast.success(message);
      setTitle("");
      setDescription("");
      setPlace("");
      setPlayerId("");
      setVideos([]);

      // Después de crear la entrada redirigimos al Home.
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Función que maneja el evento onChange del input de tipo file.
  const handleFiles = (e) => {
    // Creamos un array con las fotos seleccionadas.
    const files = Array.from(e.target.files);

    // Si hay tres fotos las convertimos a un array y las establecemos con setPhotos.
    if (files.length < 4) {
      setVideos(files);
    } else {
      // Indicamos que solo puedes seleccionar 3 videos.
      toast.error("Max Files Up to 3");

      // Limpiamos la selección de archivos.
      e.target.value = null;
    }
  };

  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell Us Your Skills..."
          required
        ></textarea>

        <label htmlFor="players">Choose Your Player:</label>
        <select
          id="players"
          onChange={(e) => setPlayerId(parseInt(e.target.value))}
        >
          <option value="choose">Choose Any Player</option>
          {authPlayers.map((player) => {
            return (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            );
          })}
        </select>

        <label htmlFor="video">Add 1 up to 3 Videos:</label>
        <input
          type="file"
          id="video"
          onChange={handleFiles}
          accept="video/mp4"
          multiple
        />

        <button>Create Post</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
