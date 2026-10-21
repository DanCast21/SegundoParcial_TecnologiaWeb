import { NavLink, Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { useUsuarios } from "../context/UsuariosContext";
import { useState } from "react";

export default function Navbar() {
  const { favoritos } = useFavoritos();
  const { usuarios } = useUsuarios();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
          <span className="logo-text">SW Explorer</span>
        </Link>
      </div>

      <button
        className={`navbar-hamburger ${menuAbierto ? "abierto" : ""}`}
        onClick={toggleMenu}
        aria-label="Menú de navegación"
        aria-expanded={menuAbierto}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        className={`navbar-nav ${menuAbierto ? "nav-abierta" : ""}`}
        aria-label="Navegación principal"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
          onClick={cerrarMenu}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/lista"
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
          onClick={cerrarMenu}
        >
          Lista
        </NavLink>
        <NavLink
          to="/favoritos"
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
          onClick={cerrarMenu}
        >
          Favoritos
          {favoritos.length > 0 && (
            <span className="nav-badge">{favoritos.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/registro"
          className={({ isActive }) =>
            isActive ? "nav-link activo" : "nav-link"
          }
          onClick={cerrarMenu}
        >
          Registro
          {usuarios.length > 0 && (
            <span className="nav-badge nav-badge--usuarios">
              {usuarios.length}
            </span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}
