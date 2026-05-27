import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { crearEntrenamiento } from "../../services/entrenamientoServicio"

function usePaginaNuevoEntrenamiento() {

  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleCrear = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError("El nombre es obligatorio")
      return
    }
    setError("")
    setCargando(true)

    try {
      const entrenamiento = await crearEntrenamiento({
        idUsuario: usuario.idUsuario,
        nombre: nombre.trim()
      })
      navigate(`/entrenamientos/${entrenamiento.idEntrenamiento}`)
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el entrenamiento")
    } finally {
      setCargando(false)
    }
  }

  return {
    nombre,
    setNombre,
    error,
    cargando,
    handleCrear,
    navigate
  }
}

export default usePaginaNuevoEntrenamiento