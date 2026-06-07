import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaLogin from "./pages/Login/PaginaLogin"
import PaginaRegistro from "./pages/Registro/PaginaRegistro"
import PaginaSeleccionAvatar from "./pages/SeleccionAvatar/PaginaSeleccionAvatar"
import PaginaDashboard from "./pages/Dashboard/PaginaDashboard"
import PaginaNuevoEntrenamiento from "./pages/NuevoEntrenamiento/PaginaNuevoEntrenamiento"
import PaginaDetalleEntrenamiento from "./pages/DetalleEntrenamiento/PaginaDetalleEntrenamiento"
import PaginaEstadisticas from "./pages/Estadisticas/PaginaEstadisticas"
import PaginaProgreso from "./pages/Progreso/PaginaProgreso"
import PaginaPerfil from "./pages/Perfil/PaginaPerfil"
import RutaProtegida from "./components/RutaProtegida/RutaProtegida"
import PaginaAdmin from "./pages/Admin/PaginaAdmin"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*RUTAS PUBLICAS*/}
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />

        {/*RUTAS PROTEGIDAS (NECESITAN LOGIN)*/}
        <Route path="/seleccionar-avatar" element={
          <RutaProtegida>
            <PaginaSeleccionAvatar />
          </RutaProtegida>
        } />

        <Route path="/dashboard" element={
          <RutaProtegida>
            <PaginaDashboard />
          </RutaProtegida>
        } />

        <Route path="/entrenamientos/nuevo" element={
          <RutaProtegida>
            <PaginaNuevoEntrenamiento />
          </RutaProtegida>
        } />

        <Route path="/entrenamientos/:id" element={
          <RutaProtegida>
            <PaginaDetalleEntrenamiento />
          </RutaProtegida>
        } />

        <Route path="/estadisticas" element={
          <RutaProtegida>
            <PaginaEstadisticas />
          </RutaProtegida>
        } />

        <Route path="/progreso" element={
          <RutaProtegida>
            <PaginaProgreso />
          </RutaProtegida>
        } />

        <Route path="/perfil" element={
          <RutaProtegida>
            <PaginaPerfil />
          </RutaProtegida>
        } />

        <Route path="/admin" element={
          <RutaProtegida soloAdmin={true}>
            <PaginaAdmin />
        </RutaProtegida>
        } />



      </Routes>
    </BrowserRouter>
  )
}

export default App