import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const stored = localStorage.getItem("sw_favoritos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sw_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function agregarFavorito(item) {
    setFavoritos((prev) => {
      const existe = prev.some((f) => f.url === item.url);
      if (existe) return prev;
      return [...prev, item];
    });
  }

  function quitarFavorito(url) {
    setFavoritos((prev) => prev.filter((f) => f.url !== url));
  }

  function esFavorito(url) {
    return favoritos.some((f) => f.url === url);
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, agregarFavorito, quitarFavorito, esFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
