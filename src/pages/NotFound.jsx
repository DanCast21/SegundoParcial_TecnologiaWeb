import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="notfound-pagina">
      <div className="notfound-contenido">
        <div className="notfound-codigo" aria-hidden="true">
          404
        </div>
        <div className="notfound-icono" aria-hidden="true">
          🌌
        </div>
        <h1 className="notfound-titulo">Página no encontrada</h1>
        <p className="notfound-desc">
          Esta parte de la galaxia no existe. La página que buscas se perdió
          entre las estrellas.
        </p>
        <Link to="/" className="btn btn--primario">
          🚀 Volver al inicio
        </Link>
      </div>
    </main>
  );
}
