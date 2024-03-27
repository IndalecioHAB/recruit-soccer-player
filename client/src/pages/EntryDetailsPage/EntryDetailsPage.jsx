// Importamos los hooks.
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useEntry from "../../hooks/useEntry";

// Importamos toast
import toast from "react-hot-toast";

// Importamos el contexto.
import { AuthContext } from "../../contexts/AuthContext";

// Variable de entorno
const { VITE_API_URL } = import.meta.env;

// Importamos las funciones que hacen el fetch
import {
  insertEntryVideoService,
  deleteEntryVideoService,
  deleteEntryService,
} from "../../services/entriesServices";
import { newRecruitment } from "../../services/recruiterServices";

//Importamos el css
import "./EntryDetailsPage.css";

// Inicializamos el componente.
const EntryDetailsPage = () => {
  // Obtenemos los datos del usuario y el token.
  const { authUser, authToken } = useContext(AuthContext);

  //Creamos la variable que obtendra el video
  const [video, setNewVideo] = useState(null);

  // Obtenemos el path param con el ID de la entrada.
  const { entryId } = useParams();

  const navigate = useNavigate();

  // Importamos lo necesario de useEntry.
  const { entry, addEntryVideo } = useEntry(entryId);

  // Funcion controladora de añadir video
  const handleSubmit = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Insertamos la foto y obtenemos sus datos y el mensaje.
      const { newVideo, message } = await insertEntryVideoService(
        video,
        entryId,
        authToken,
        entry.playerId,
      );

      // Mostramos un mensaje indicando que todo ha ido bien.
      toast.success(message);
      navigate("/");

      // Actualizamos el State de la entrada con la nueva foto.
      addEntryVideo(newVideo);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Funcion controladora para borrar video
  const handleDeleteVideo = async (videoId) => {
    try {
      const message = await deleteEntryVideoService(
        entryId,
        videoId,
        authToken
      );
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Función controladora para borrar entrada
  const handleDeleteEntry = async () => {
    try {
      const message = await deleteEntryService(authToken, entryId);
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Función controladora para reclutar al jugador: authToken ahora es el id del recruiter.
  const handleRecruitPlayer = async () => {
    try {
      const message = await newRecruitment(entry.playerId, entryId, authToken);
      toast.success("We have sent an email to the family player");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      {entry && (
        <>
          <h2>{entry.title}</h2>

          <div className="entry-info">
            <div className="entry-details">
              <p><span>Place:</span> {entry.place}</p>
              <p><span>Description:</span> {entry.description}</p>
              <p><span>Family:</span> {entry.username}</p>
              {entry.playerName.map((player) => (
                <p><span>Player:</span> {player.name}</p>
              ))}
              <p><span>Created At:</span> {entry.createdAt}</p>
            </div>

            <div className="entry-videos">
              {entry.videos.map((video) => (
                <>
                  <video key={video.id} controls>
                    <source
                      src={`${VITE_API_URL}/${video.VideoName}`}
                      type="video/mp4"
                    />
                  </video>
                  {authUser?.id === entry.userId && (
                    <button onClick={() => handleDeleteVideo(video.id)}>
                      Delete Video
                    </button>
                  )}
                </>
              ))}
            </div>

            <div className="entry-add-video">
              {/* Si somos los dueños de la entrada... */}
              {authUser?.id === entry.userId && (
                <>
                  {/* Si somos los dueños de la entrada y tenemos cero fotos... */}
                  {entry.videos.length === 0 && (
                    <h3>
                      ¡You have not add any video in this entry! ¿What are you
                      waiting for?
                    </h3>
                  )}

                  {/* Si somos los dueños de la entrada y tenemos una foto... */}
                  {entry.videos.length === 1 && (
                    <h3>¡You can still add two more videos!</h3>
                  )}

                  {/* Si somos los dueños de la entrada y tenemos dos fotos... */}
                  {entry.videos.length === 2 && (
                    <h3>¡You can still add one more video!</h3>
                  )}

                  {/* Si hay menos de tres fotos mostramos el input. */}
                  {entry.videos.length < 3 && (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="file"
                        onChange={(e) => setNewVideo(e.target.files[0])}
                        required
                      />

                      <button>Add</button>
                    </form>
                  )}
                </>
              )}
            </div>
            {authUser?.id === entry.userId && (
              <div className="delete-video">
                <p>Do you want to delete this entry?</p>
                <button onClick={() => handleDeleteEntry()}>
                  Delete Entry
                </button>
              </div>
            )}
            {authUser && authUser.role === "recruiter" && (
              <div className="newContract">
                <p>Do you want to recruit this player??</p>
                <button onClick={() => handleRecruitPlayer()}>
                  Recruit Player
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default EntryDetailsPage;
