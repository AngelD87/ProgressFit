import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

function RutaProtegida({ children, soloAdmin = false }) {

  const { usuario } = useAuth()

  //SI NO HAY USUARIO LOGUEADO VAMOS AL LOGIN
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  //SI LA RUTA ES SOLO ADMIN Y NO ES ADMIN VAMOS AL DASHBOARD
  if (soloAdmin && usuario.rol !== "ADMIN") {
    return <Navigate to="/dashboard" replace />
  }

  //SI TODO OK MOSTRAMOS LA PAGINA
  return children
}

export default RutaProtegida