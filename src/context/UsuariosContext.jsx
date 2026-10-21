import { createContext, useContext, useState } from "react";

const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  function agregarUsuario(usuario) {
    setUsuarios((prev) => [...prev, usuario]);
  }

  function editarUsuario(identificacion, datos) {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.identificacion === identificacion ? { ...u, ...datos } : u,
      ),
    );
  }

  function eliminarUsuario(identificacion) {
    setUsuarios((prev) =>
      prev.filter((u) => u.identificacion !== identificacion),
    );
  }

  return (
    <UsuariosContext.Provider
      value={{ usuarios, agregarUsuario, editarUsuario, eliminarUsuario }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  return useContext(UsuariosContext);
}
