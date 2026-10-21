export default function Cargando({
  mensaje = "Cargando datos de la galaxia...",
}) {
  return (
    <div className="cargando" role="status" aria-live="polite">
      <div className="cargando-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring spinner-ring--2"></div>
        <div className="spinner-ring spinner-ring--3"></div>
      </div>
      <p className="cargando-texto">{mensaje}</p>
    </div>
  );
}
