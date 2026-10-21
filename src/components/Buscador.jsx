import { useState } from "react";

export default function Buscador({
  valor,
  onChange,
  onSubmit,
  placeholder = "Buscar...",
}) {
  const [inputLocal, setInputLocal] = useState(valor || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputLocal.trim());
  }

  function handleChange(e) {
    setInputLocal(e.target.value);
    if (onChange) onChange(e.target.value);
  }

  function handleLimpiar() {
    setInputLocal("");
    onSubmit("");
    if (onChange) onChange("");
  }

  return (
    <form className="buscador" onSubmit={handleSubmit} role="search">
      <div className="buscador-input-wrap">
        <span className="buscador-icono" aria-hidden="true">
          🔍
        </span>
        <input
          id="buscador-input"
          type="search"
          className="buscador-input"
          value={inputLocal}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Campo de búsqueda"
        />
        {inputLocal && (
          <button
            type="button"
            className="buscador-limpiar"
            onClick={handleLimpiar}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="buscador-btn">
        Buscar
      </button>
    </form>
  );
}
