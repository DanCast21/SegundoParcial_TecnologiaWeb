import { useState } from "react";
import { useUsuarios } from "../context/UsuariosContext";
import FormularioUsuario from "../components/FormularioUsuario";
import ListaUsuarios from "../components/ListaUsuarios";
import Mensaje from "../components/Mensaje";

export default function Registro() {
  const { usuarios, agregarUsuario, editarUsuario, eliminarUsuario } =
    useUsuarios();
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mensajeOperacion, setMensajeOperacion] = useState(null);

  function handleRegistrar(datos) {
    agregarUsuario(datos);
    setMensajeOperacion({
      tipo: "exito",
      texto: `Usuario "${datos.nombre}" registrado correctamente.`,
    });
    setTimeout(() => setMensajeOperacion(null), 4000);
  }

  function handleActualizar(identificacionOriginal, datos) {
    editarUsuario(identificacionOriginal, datos);
    setUsuarioEditando(null);
    setMensajeOperacion({
      tipo: "exito",
      texto: `Usuario "${datos.nombre}" actualizado correctamente.`,
    });
    setTimeout(() => setMensajeOperacion(null), 4000);
  }

  function handleEditar(usuario) {
    setUsuarioEditando(usuario);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEliminar(identificacion) {
    const usuario = usuarios.find((u) => u.identificacion === identificacion);
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario "${usuario?.nombre}" (ID: ${identificacion})?`,
    );
    if (!confirmado) return;

    eliminarUsuario(identificacion);

    if (usuarioEditando?.identificacion === identificacion) {
      setUsuarioEditando(null);
    }

    setMensajeOperacion({
      tipo: "advertencia",
      texto: `Usuario "${usuario?.nombre}" eliminado.`,
    });
    setTimeout(() => setMensajeOperacion(null), 4000);
  }

  function handleCancelar() {
    setUsuarioEditando(null);
    setMensajeOperacion(null);
  }

  return (
    <main className="registro-pagina">
      <div className="registro-cabecera">
        <h1 className="registro-titulo">Registro de Usuarios</h1>
        <p className="registro-subtitulo">
          Gestión completa de usuarios: registra, edita y elimina. Los datos se
          mantienen durante la sesión.
        </p>
        <div className="registro-total">
          Total de usuarios registrados: <strong>{usuarios.length}</strong>
        </div>
      </div>

      {mensajeOperacion && (
        <Mensaje tipo={mensajeOperacion.tipo}>{mensajeOperacion.texto}</Mensaje>
      )}

      <div className="registro-layout">
        <div className="registro-form-col">
          <FormularioUsuario
            usuarioEditando={usuarioEditando}
            onRegistrar={handleRegistrar}
            onActualizar={handleActualizar}
            onCancelar={handleCancelar}
            usuarios={usuarios}
          />
        </div>

        <div className="registro-lista-col">
          <ListaUsuarios
            usuarios={usuarios}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            usuarioEditandoId={usuarioEditando?.identificacion}
          />
        </div>
      </div>
    </main>
  );
}
