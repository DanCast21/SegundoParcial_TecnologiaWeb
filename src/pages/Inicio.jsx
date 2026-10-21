import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <main className="inicio">
      <div className="inicio-hero">
        <div className="inicio-hero-fondo" aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="estrella"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}
        </div>

        <div className="inicio-hero-contenido">
          <h1 className="inicio-titulo">
            Explora la <span className="titulo-destacado">galaxia</span> de Star
            Wars
          </h1>
          <p className="inicio-descripcion">
            Descubre personajes icónicos, planetas remotos, naves legendarias y
            películas épicas. Toda la información proviene directamente de{" "}
            <strong>SWAPI</strong> (Star Wars API), la base de datos abierta más
            completa del universo Star Wars.
          </p>

          <div className="inicio-stats">
            <div className="stat-item">
              <span className="stat-valor">82+</span>
              <span className="stat-label">Personajes</span>
            </div>
            <div className="stat-item">
              <span className="stat-valor">60+</span>
              <span className="stat-label">Planetas</span>
            </div>
            <div className="stat-item">
              <span className="stat-valor">36+</span>
              <span className="stat-label">Naves</span>
            </div>
            <div className="stat-item">
              <span className="stat-valor">6</span>
              <span className="stat-label">Películas</span>
            </div>
          </div>

          <div className="inicio-acciones">
            <Link to="/lista" className="btn-hero btn-hero--primario">
              Explorar galaxia
            </Link>
          </div>
        </div>
      </div>

      <section
        className="inicio-categorias"
        aria-labelledby="categorias-titulo"
      >
        <h2 id="categorias-titulo" className="section-titulo">
          ¿Qué puedes explorar?
        </h2>
        <div className="categorias-grid">
          {SECCIONES.map((s) => (
            <Link
              key={s.categoria}
              to={`/lista?categoria=${s.categoria}`}
              className="categoria-card"
            >
              <h3 className="categoria-nombre">{s.nombre}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

const SECCIONES = [
  {
    categoria: "people",
    nombre: "Personajes",
  },
  {
    categoria: "planets",
    nombre: "Planetas",
  },
  {
    categoria: "starships",
    nombre: "Naves",
  },
  {
    categoria: "films",
    nombre: "Películas",
  },
];
