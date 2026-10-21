import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchCategory,
  searchCategory,
  CATEGORIES,
} from "../services/swapiService";
import Tarjeta from "../components/Tarjeta";
import Buscador from "../components/Buscador";
import Cargando from "../components/Cargando";
import Mensaje from "../components/Mensaje";

export default function Lista() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoria, setCategoria] = useState(
    searchParams.get("categoria") || "people",
  );
  const [busqueda, setBusqueda] = useState("");
  const [items, setItems] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [cargandoMas, setCargandoMas] = useState(false);

  const cargarDatos = useCallback(async (cat, query, pag, acumular) => {
    if (pag === 1) setCargando(true);
    else setCargandoMas(true);
    setError("");

    try {
      let datos;
      if (query.trim()) {
        datos = await searchCategory(cat, query, pag);
      } else {
        datos = await fetchCategory(cat, pag);
      }
      setTotalPaginas(Math.ceil(datos.count / 10));
      setItems((prev) =>
        acumular ? [...prev, ...datos.results] : datos.results,
      );
    } catch (err) {
      setError(err.message || "Error al cargar los datos.");
    } finally {
      setCargando(false);
      setCargandoMas(false);
    }
  }, []);

  useEffect(() => {
    setItems([]);
    setPagina(1);
    cargarDatos(categoria, busqueda, 1, false);
    setSearchParams({ categoria });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria]);

  useEffect(() => {
    if (pagina === 1) return;
    cargarDatos(categoria, busqueda, pagina, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  function handleBuscar(texto) {
    setBusqueda(texto);
    setItems([]);
    setPagina(1);
    cargarDatos(categoria, texto, 1, false);
  }

  function handleCambiarCategoria(e) {
    setCategoria(e.target.value);
    setBusqueda("");
  }

  function handleCargarMas() {
    setPagina((prev) => prev + 1);
  }

  const hayMas = pagina < totalPaginas;

  return (
    <main className="lista-pagina">
      <div className="lista-cabecera">
        <h1 className="lista-titulo">Explorar el universo</h1>
        <p className="lista-subtitulo">
          Navega por los elementos de Star Wars obtenidos directamente de SWAPI
        </p>
      </div>

      <div className="lista-controles">
        <div className="controles-fila">
          <div className="filtro-categoria">
            <label htmlFor="select-categoria" className="filtro-label">
              Categoría
            </label>
            <select
              id="select-categoria"
              className="filtro-select"
              value={categoria}
              onChange={handleCambiarCategoria}
            >
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Buscador
          valor={busqueda}
          onSubmit={handleBuscar}
          placeholder={`Buscar en ${CATEGORIES[categoria] || "esta categoría"}...`}
        />
      </div>

      {cargando && <Cargando />}

      {!cargando && error && <Mensaje tipo="error">{error}</Mensaje>}

      {!cargando && !error && items.length === 0 && (
        <Mensaje tipo="vacio">
          No se encontraron resultados{busqueda ? ` para "${busqueda}"` : ""}.
        </Mensaje>
      )}

      {!cargando && items.length > 0 && (
        <>
          <p className="lista-conteo">
            Mostrando <strong>{items.length}</strong> elemento
            {items.length !== 1 ? "s" : ""}
          </p>
          <div className="lista-grid">
            {items.map((item) => (
              <Tarjeta key={item.url} item={item} categoria={categoria} />
            ))}
          </div>
        </>
      )}

      {!cargando && hayMas && items.length > 0 && (
        <div className="lista-mas">
          <button
            className="btn-cargar-mas"
            onClick={handleCargarMas}
            disabled={cargandoMas}
          >
            {cargandoMas ? "⏳ Cargando..." : "⬇ Cargar más"}
          </button>
        </div>
      )}
    </main>
  );
}
