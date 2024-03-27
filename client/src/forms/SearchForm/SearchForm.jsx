// Importamos las prop-types.
import PropType from "prop-types";

// Importamos los hooks.
import { useState } from "react";

// Inicializamos el componente.
const SearchForm = ({ setSearchParams }) => {
  // Declaramos una variable en el State por cada elemento del formulario.
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [currentTeam, setCurrentTeam] = useState("");

  // Función que maneja el envío del formulario.
  const handleSubmit = (e) => {
    // Prevenimos el comportamiento por defecto del formulario.
    e.preventDefault();

    // Establecemos los query params.
    setSearchParams(
      new URLSearchParams({
        age,
        position,
        skills,
        currentTeam,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="position">Position: </label>
        <select
          id="position"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        >
          <option value="">Choose Position</option>
          <option value="Delantero">Forward</option>
          <option value="Centrocampista">Midfielder</option>
          <option value="Defensa">Defender</option>
          <option value="Portero">Goalkeeper</option>
        </select>
      </div>

      <div>
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="currentTeam">Current Team:</label>
        <input
          type="text"
          id="currentTeam"
          value={currentTeam}
          onChange={(e) => setCurrentTeam(e.target.value)}
        />
      </div>

      <button>Buscar</button>
    </form>
  );
};

// Validamos las props.
SearchForm.propTypes = {
  setSearchParams: PropType.func.isRequired,
};

export default SearchForm;
