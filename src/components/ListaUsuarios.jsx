import Mensaje from "./Mensaje";

export default function ListaUsuarios({
  usuarios,
  onEditar,
  onEliminar,
  usuarioEditandoId,
}) {
  if (usuarios.length === 0) {
    return (
      <div className="lista-usuarios-vacia">
        <Mensaje tipo="vacio">Aún no hay usuarios registrados.</Mensaje>
      </div>
    );
  }

  return (
    <section className="lista-usuarios">
      <h2 className="lista-usuarios-titulo">
        Usuarios registrados{" "}
        <span className="badge-total">{usuarios.length}</span>
      </h2>
      <div className="tabla-wrap">
        <table
          className="tabla-usuarios"
          aria-label="Lista de usuarios registrados"
        >
          <thead>
            <tr>
              <th scope="col">Identificación</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr
                key={u.identificacion}
                className={
                  usuarioEditandoId === u.identificacion ? "fila-editando" : ""
                }
              >
                <td data-label="Identificación">{u.identificacion}</td>
                <td data-label="Nombre">{u.nombre}</td>
                <td data-label="Correo">{u.correo}</td>
                <td data-label="Acciones" className="tabla-acciones">
                  <button
                    className="btn-tabla btn-tabla--editar"
                    onClick={() => onEditar(u)}
                    aria-label={`Editar usuario ${u.nombre}`}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-tabla btn-tabla--eliminar"
                    onClick={() => onEliminar(u.identificacion)}
                    aria-label={`Eliminar usuario ${u.nombre}`}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
