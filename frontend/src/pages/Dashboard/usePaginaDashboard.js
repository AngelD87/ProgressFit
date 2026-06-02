import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { obtenerEntrenamientos } from "../../services/entrenamientoServicio"

function usePaginaDashboard() {

  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [entrenamientos, setEntrenamientos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarEntrenamientos = async () => {
      try {
        const datos = await obtenerEntrenamientos(usuario.idUsuario)
        setEntrenamientos(datos)
      } catch (err) {
        console.error("Error al cargar entrenamientos", err)
      } finally {
        setCargando(false)
      }
    }
    cargarEntrenamientos()
  }, [usuario.idUsuario])

  return {
    usuario,
    entrenamientos,
    cargando,
    navigate
  }
}

export default usePaginaDashboard