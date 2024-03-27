// Importamos los hooks.
import useEntries from "../../hooks/useEntries";

import { Link } from "react-router-dom";

// Importamos las dependencias
import { useEffect, useState } from "react";

// Importamos el css
import "./HomePage.css";

// Importamos el formulario de busqueda
import SearchForm from "../../forms/SearchForm/SearchForm";

// Variable de entorno
const { VITE_API_URL } = import.meta.env;

// Creamos el componente Header
const HomePage = () => {
  const { entries, setSearchParams, prevPage, currentPage, nextPage } =
    useEntries();

  return (
    <>
      <main>
        <div className="buttons">
          <button
            className="prev-page"
            onClick={() => {
              // Establecemos el query param con la página previa.
              setSearchParams(
                new URLSearchParams({
                  page: prevPage,
                })
              );
            }}
            disabled={!prevPage}
          >
            ◀️
          </button>

          <span>{currentPage}</span>
          <button
            className="next-page"
            onClick={() => {
              // Establecemos el query param con la página previa.
              setSearchParams(
                new URLSearchParams({
                  page: nextPage,
                })
              );
            }}
            disabled={!nextPage}
          >
            ▶️
          </button>
        </div>

        <div className="container">         
          <SearchForm setSearchParams={setSearchParams} />
          {entries.map((data) => {
            return (
              <>
                <Link to={`/entries/${data.id}`} className="entry-item">
                  <section key={data.id}>
                    <p>{data.playerName}</p>
                    <div className="videos-container">
                      {data.videos.map(
                        (video, index) =>
                          index === 0 && (
                            <video key={video.id} controls>
                              <source
                                src={`${VITE_API_URL}/${video.videoName}`}
                                type="video/mp4"
                              />
                            </video>
                          )
                      )}
                    </div>
                  </section>
                </Link>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default HomePage;
