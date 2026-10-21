import { Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { extractIdFromUrl, getCategoryFromUrl } from "../services/swapiService";
import Mensaje from "../components/Mensaje";

export default function Favoritos() {
  const { favoritos, quitarFavorito } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <main className="favoritos-pagina">
        <h1 className="favoritos-titulo">Mis Favoritos</h1>
        <div className="favoritos-vacio">
          <Mensaje tipo="vacio">
            Aún no tienes favoritos. ¡Explora la galaxia y guarda tus elementos
            favoritos!
          </Mensaje>
          <Link to="/lista" className="btn btn--primario">
            Ir al listado
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="favoritos-pagina">
      <div className="favoritos-cabecera">
        <h1 className="favoritos-titulo">Mis Favoritos</h1>
        <p className="favoritos-conteo">
          Tienes <strong>{favoritos.length}</strong> elemento
          {favoritos.length !== 1 ? "s" : ""} en favoritos
        </p>
      </div>

      <div className="favoritos-grid">
        {favoritos.map((item) => {
          const cat = item._categoria || getCategoryFromUrl(item.url);
          const id = extractIdFromUrl(item.url);
          const nombre = item.name || item.title || "Sin nombre";

          return (
            <article key={item.url} className="fav-card">
              <div className="fav-card-header">
                <span className="fav-cat-badge">{getCatLabel(cat)}</span>
              </div>
              <div className="fav-card-body">
                <h2 className="fav-card-nombre">{nombre}</h2>
                <div className="fav-card-acciones">
                  <Link
                    to={`/detalle/${cat}/${id}`}
                    className="btn btn--primario btn--sm"
                  >
                    Ver detalle →
                  </Link>
                  <button
                    className="btn btn--peligro btn--sm"
                    onClick={() => quitarFavorito(item.url)}
                    aria-label={`Quitar ${nombre} de favoritos`}
                  >
                    ★ Quitar
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
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
