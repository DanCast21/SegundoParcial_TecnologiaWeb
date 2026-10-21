import { Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { extractIdFromUrl, getCategoryFromUrl } from "../services/swapiService";

export default function Tarjeta({ item, categoria }) {
  const { esFavorito, agregarFavorito, quitarFavorito } = useFavoritos();
  const id = extractIdFromUrl(item.url);
  const cat = categoria || getCategoryFromUrl(item.url);
  const esFav = esFavorito(item.url);
  const nombre = item.name || item.title || "Sin nombre";

  function toggleFavorito(e) {
    e.preventDefault();
    e.stopPropagation();
    if (esFav) {
      quitarFavorito(item.url);
    } else {
      agregarFavorito({ ...item, _categoria: cat });
    }
  }

  function getSubtitulo() {
    if (cat === "people") return item.gender ? `Género: ${item.gender}` : "";
    if (cat === "planets") return item.climate ? `Clima: ${item.climate}` : "";
    if (cat === "starships")
      return item.manufacturer ? `Fabricante: ${item.manufacturer}` : "";
    if (cat === "films")
      return item.director ? `Director: ${item.director}` : "";
    return "";
  }

  return (
    <article className="tarjeta">
      <div className="tarjeta-header">
        <span className="tarjeta-categoria-badge">{getCatLabel(cat)}</span>
        <button
          className={`tarjeta-fav-btn ${esFav ? "activo" : ""}`}
          onClick={toggleFavorito}
          aria-label={esFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={esFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {esFav ? "★" : "☆"}
        </button>
      </div>
      <div className="tarjeta-body">
        <h3 className="tarjeta-nombre">{nombre}</h3>
        <p className="tarjeta-subtitulo">{getSubtitulo()}</p>
        <Link to={`/detalle/${cat}/${id}`} className="tarjeta-btn">
          Ver detalle →
        </Link>
      </div>
    </article>
  );
}

function getCatLabel(cat) {
  const map = {
    people: "Personaje",
    planets: "Planeta",
    starships: "Nave",
    films: "Película",
  };
  return map[cat] || cat;
}
