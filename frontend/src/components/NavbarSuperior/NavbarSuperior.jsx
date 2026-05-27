import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import logo from "../../assets/logo.png"
import "./NavbarSuperior.css"

function NavbarSuperior({ rutaVolver }) {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar-superior">
      <div className="navbar-superior-izquierda">
        <img
          src={logo}
          alt="ProgressFit"
          className="navbar-logo"
          onClick={() => navigate("/dashboard")}
        />
        {rutaVolver && (
          <button className="navbar-boton-volver" onClick={() => navigate(rutaVolver)}>
             Volver
          </button>
        )}
      </div>
      <button className="navbar-boton-salir" onClick={handleLogout}>
        Salir
      </button>
    </nav>
  )
}

export default NavbarSuperior