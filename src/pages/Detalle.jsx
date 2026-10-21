import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById } from "../services/swapiService";
import { useFavoritos } from "../context/FavoritosContext";
import Cargando from "../components/Cargando";
import Mensaje from "../components/Mensaje";

const CAT_LABELS = {
  people: "Personaje",
  planets: "Planeta",
  starships: "Nave",
  films: "Película",
};

export default function Detalle() {
  const { categoria, id } = useParams();
  const navigate = useNavigate();
  const { esFavorito, agregarFavorito, quitarFavorito } = useFavoritos();

  const [item, setItem] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError("");
    setItem(null);

    fetchById(categoria, id)
      .then((datos) => {
        if (!cancelado) setItem(datos);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message || "Error al cargar el detalle.");
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [categoria, id]);

  if (cargando)
    return (
      <main className="detalle-pagina">
        <Cargando />
      </main>
    );
  if (error)
    return (
      <main className="detalle-pagina">
        <Mensaje tipo="error">{error}</Mensaje>
        <button
          className="btn btn--secundario"
          onClick={() => navigate("/lista")}
        >
          ← Volver
        </button>
      </main>
    );
  if (!item) return null;

  const esFav = esFavorito(item.url);
  const nombre = item.name || item.title || "Sin nombre";
  const campos = getCampos(item, categoria);

  function toggleFavorito() {
    if (esFav) {
      quitarFavorito(item.url);
    } else {
      agregarFavorito({ ...item, _categoria: categoria });
    }
  }

  return (
    <main className="detalle-pagina">
      <div className="detalle-container">
        <div className="detalle-imagen-col">
          <div className="detalle-badge">
            <span className="badge-cat">
              {CAT_LABELS[categoria] || categoria}
            </span>
          </div>

          <button
            id="btn-favorito"
            className={`btn-fav-detalle ${esFav ? "activo" : ""}`}
            onClick={toggleFavorito}
          >
            {esFav ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
          </button>

          <button
            id="btn-volver"
            className="btn btn--secundario btn--volver"
            onClick={() => navigate(-1)}
          >
            ← Volver al listado
          </button>
        </div>

        <div className="detalle-info-col">
          <h1 className="detalle-nombre">{nombre}</h1>

          <dl className="detalle-datos">
            {campos.map(({ clave, valor }) =>
              valor && valor !== "unknown" && valor !== "n/a" ? (
                <div key={clave} className="detalle-dato-fila">
                  <dt className="detalle-clave">{clave}</dt>
                  <dd className="detalle-valor">{valor}</dd>
                </div>
              ) : null,
            )}
          </dl>

          {categoria === "films" && item.opening_crawl && (
            <div className="detalle-crawl">
              <h2 className="crawl-titulo">Texto de apertura</h2>
              <p className="crawl-texto">{item.opening_crawl}</p>
            </div>
          )}

          <div className="detalle-meta">
            <p className="detalle-url">
              🔗{" "}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function getCampos(item, categoria) {
  if (categoria === "people") {
    return [
      {
        clave: "Altura",
        valor: item.height !== "unknown" ? `${item.height} cm` : item.height,
      },
      {
        clave: "Masa",
        valor: item.mass !== "unknown" ? `${item.mass} kg` : item.mass,
      },
      { clave: "Color de cabello", valor: item.hair_color },
      { clave: "Color de piel", valor: item.skin_color },
      { clave: "Color de ojos", valor: item.eye_color },
      { clave: "Año de nacimiento", valor: item.birth_year },
      { clave: "Género", valor: item.gender },
    ];
  }
  if (categoria === "planets") {
    return [
      {
        clave: "Período de rotación",
        valor:
          item.rotation_period !== "unknown"
            ? `${item.rotation_period} h`
            : item.rotation_period,
      },
      {
        clave: "Período orbital",
        valor:
          item.orbital_period !== "unknown"
            ? `${item.orbital_period} días`
            : item.orbital_period,
      },
      {
        clave: "Diámetro",
        valor:
          item.diameter !== "unknown" ? `${item.diameter} km` : item.diameter,
      },
      { clave: "Clima", valor: item.climate },
      { clave: "Gravedad", valor: item.gravity },
      { clave: "Terreno", valor: item.terrain },
      {
        clave: "Agua superficial",
        valor:
          item.surface_water !== "unknown"
            ? `${item.surface_water}%`
            : item.surface_water,
      },
      { clave: "Población", valor: item.population },
    ];
  }
  if (categoria === "starships") {
    return [
      { clave: "Modelo", valor: item.model },
      { clave: "Fabricante", valor: item.manufacturer },
      {
        clave: "Costo",
        valor:
          item.cost_in_credits !== "unknown"
            ? `${Number(item.cost_in_credits).toLocaleString()} créditos`
            : item.cost_in_credits,
      },
      {
        clave: "Longitud",
        valor: item.length !== "unknown" ? `${item.length} m` : item.length,
      },
      { clave: "Velocidad máxima", valor: item.max_atmosphering_speed },
      { clave: "Tripulación", valor: item.crew },
      { clave: "Pasajeros", valor: item.passengers },
      { clave: "Capacidad de carga", valor: item.cargo_capacity },
      { clave: "Clase", valor: item.starship_class },
    ];
  }
  if (categoria === "films") {
    return [
      {
        clave: "Episodio",
        valor: item.episode_id ? `Episodio ${item.episode_id}` : null,
      },
      { clave: "Director", valor: item.director },
      { clave: "Productor", valor: item.producer },
      { clave: "Fecha de estreno", valor: item.release_date },
    ];
  }
  return [];
}
