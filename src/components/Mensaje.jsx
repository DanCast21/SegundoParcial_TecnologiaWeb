export default function Mensaje({ tipo = "info", children }) {
  return (
    <div
      className={`mensaje mensaje--${tipo}`}
      role={tipo === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <span className="mensaje-texto">{children}</span>
    </div>
  );
}
