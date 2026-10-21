import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FavoritosProvider } from "./context/FavoritosContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Lista from "./pages/Lista";
import Detalle from "./pages/Detalle";
import Favoritos from "./pages/Favoritos";
import Registro from "./pages/Registro";
import NotFound from "./pages/NotFound";

function Layout() {
  const location = useLocation();
  const esInicio = location.pathname === "/";

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/detalle/:categoria/:id" element={<Detalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!esInicio && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FavoritosProvider>
        <UsuariosProvider>
          <Layout />
        </UsuariosProvider>
      </FavoritosProvider>
    </BrowserRouter>
  );
}
