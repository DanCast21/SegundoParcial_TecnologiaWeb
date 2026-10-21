export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-seccion">
          <h3 className="footer-titulo">SW Explorer</h3>
          <p className="footer-desc">
            Explora el universo de Star Wars con datos reales de SWAPI.
          </p>
        </div>

        <div className="footer-seccion">
          <h3 className="footer-titulo">API Utilizada</h3>
          <p>
            <strong>SWAPI — Star Wars API</strong>
          </p>
          <a
            href="https://swapi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            swapi.dev
          </a>
          {" · "}
          <a
            href="https://swapi.dev/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Documentación
          </a>
        </div>

        <div className="footer-seccion">
          <h3 className="footer-titulo">Integrantes</h3>
          <ul className="footer-lista">
            <li>Daniel Castillo</li>
            <li>Devinson Rivaldo</li>
          </ul>
        </div>
      </div>

      <div className="footer-copy">
        <p>
          © {new Date().getFullYear()} SW Explorer · Proyecto académico ·
          Tecnología Web
        </p>
      </div>
    </footer>
  );
}
