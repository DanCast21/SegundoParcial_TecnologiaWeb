import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";

const CAMPOS_INICIALES = { identificacion: "", nombre: "", correo: "" };

export default function FormularioUsuario({
  usuarioEditando,
  onRegistrar,
  onActualizar,
  onCancelar,
  usuarios,
}) {
  const [campos, setCampos] = useState(CAMPOS_INICIALES);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const modoEdicion = usuarioEditando !== null;

  useEffect(() => {
    if (usuarioEditando) {
      setCampos({
        identificacion: usuarioEditando.identificacion,
        nombre: usuarioEditando.nombre,
        correo: usuarioEditando.correo,
      });
      setError("");
      setExito("");
    } else {
      setCampos(CAMPOS_INICIALES);
    }
  }, [usuarioEditando]);

  function handleChange(e) {
    setCampos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setExito("");
  }

  function validar() {
    const { identificacion, nombre, correo } = campos;

    if (!identificacion.trim() || !nombre.trim() || !correo.trim()) {
      return "Todos los campos son obligatorios.";
    }
    if (!/^\d+$/.test(identificacion.trim())) {
      return "La identificación solo debe contener números.";
    }
    if (!correo.includes("@")) {
      return "El correo debe incluir el símbolo @.";
    }

    const idExistente = usuarios.find(
      (u) =>
        u.identificacion === identificacion.trim() &&
        (!modoEdicion || u.identificacion !== usuarioEditando.identificacion),
    );
    if (idExistente) {
      return `Ya existe un usuario con la identificación ${identificacion.trim()}.`;
    }

    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const mensajeError = validar();
    if (mensajeError) {
      setError(mensajeError);
      setExito("");
      return;
    }

    const datos = {
      identificacion: campos.identificacion.trim(),
      nombre: campos.nombre.trim(),
      correo: campos.correo.trim(),
    };

    if (modoEdicion) {
      onActualizar(usuarioEditando.identificacion, datos);
      setExito(`Usuario "${datos.nombre}" actualizado correctamente.`);
    } else {
      onRegistrar(datos);
      setExito(`Usuario "${datos.nombre}" registrado correctamente.`);
    }

    setCampos(CAMPOS_INICIALES);
    setError("");
  }

  function handleCancelar() {
    setCampos(CAMPOS_INICIALES);
    setError("");
    setExito("");
    onCancelar();
  }

  return (
    <section className="formulario-usuario">
      <h2 className="formulario-titulo">
        {modoEdicion ? "Editar usuario" : "Registrar usuario"}
      </h2>

      {error && <Mensaje tipo="error">{error}</Mensaje>}
      {exito && <Mensaje tipo="exito">{exito}</Mensaje>}

      <form onSubmit={handleSubmit} noValidate className="form-grid">
        <div className="form-campo">
          <label htmlFor="identificacion" className="form-label">
            Identificación *
          </label>
          <input
            id="identificacion"
            name="identificacion"
            type="text"
            className="form-input"
            value={campos.identificacion}
            onChange={handleChange}
            placeholder="Solo números"
            autoComplete="off"
            disabled={modoEdicion}
          />
          {modoEdicion && (
            <small className="form-hint">
              La identificación no se puede cambiar al editar.
            </small>
          )}
        </div>

        <div className="form-campo">
          <label htmlFor="nombre" className="form-label">
            Nombre completo *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="form-input"
            value={campos.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            autoComplete="off"
          />
        </div>

        <div className="form-campo">
          <label htmlFor="correo" className="form-label">
            Correo electrónico *
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            className="form-input"
            value={campos.correo}
            onChange={handleChange}
            placeholder="usuario@correo.com"
            autoComplete="off"
          />
        </div>

        <div className="form-acciones">
          <button type="submit" className="btn btn--primario">
            {modoEdicion ? "Guardar cambios" : "Registrar"}
          </button>
          {modoEdicion && (
            <button
              type="button"
              className="btn btn--secundario"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
