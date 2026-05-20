import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaLogin from "./pages/Login/PaginaLogin"
import PaginaRegistro from "./pages/Registro/PaginaRegistro"
import PaginaSeleccionAvatar from "./pages/SeleccionAvatar/PaginaSeleccionAvatar"
import PaginaDashboard from "./pages/Dashboard/PaginaDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/seleccionar-avatar" element={<PaginaSeleccionAvatar />} />
        <Route path="/dashboard" element={<PaginaDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App