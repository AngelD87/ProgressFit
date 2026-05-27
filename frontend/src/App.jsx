import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaLogin from "./pages/Login/PaginaLogin"
import PaginaRegistro from "./pages/Registro/PaginaRegistro"
import PaginaSeleccionAvatar from "./pages/SeleccionAvatar/PaginaSeleccionAvatar"
import PaginaDashboard from "./pages/Dashboard/PaginaDashboard"
import PaginaNuevoEntrenamiento from "./pages/NuevoEntrenamiento/PaginaNuevoEntrenamiento"
import PaginaDetalleEntrenamiento from "./pages/DetalleEntrenamiento/PaginaDetalleEntrenamiento"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/seleccionar-avatar" element={<PaginaSeleccionAvatar />} />
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/entrenamientos/nuevo" element={<PaginaNuevoEntrenamiento />} />
        <Route path="/entrenamientos/:id" element={<PaginaDetalleEntrenamiento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App