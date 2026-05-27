import { useNavigate, useLocation } from "react-router-dom"
import iconoInicio from "../../assets/iconos-navegacion/icono-inicio.png"
import iconoStats from "../../assets/iconos-navegacion/icono-stats.png"
import iconoPerfil from "../../assets/iconos-navegacion/icono-perfil.png"
import "./NavbarInferior.css"

function NavbarInferior() {

  const navigate = useNavigate()
  const location = useLocation()

  const esActivo = (ruta) => location.pathname === ruta

  return (
    <nav className="navbar-inferior">
      <button
        className={`nav-inferior-item ${esActivo("/dashboard") ? "activo" : ""}`}
        onClick={() => navigate("/dashboard")}>
        <img src={iconoInicio} alt="Inicio" className="icono-nav" />
        Inicio
      </button>
      <button
        className={`nav-inferior-item ${esActivo("/estadisticas") ? "activo" : ""}`}
        onClick={() => navigate("/estadisticas")}>
        <img src={iconoStats} alt="Stats" className="icono-nav" />
        Rendimiento
      </button>
      <button
        className={`nav-inferior-item ${esActivo("/perfil") ? "activo" : ""}`}
        onClick={() => navigate("/perfil")}>
        <img src={iconoPerfil} alt="Perfil" className="icono-nav" />
        Perfil
      </button>
    </nav>
  )
}

export default NavbarInferior