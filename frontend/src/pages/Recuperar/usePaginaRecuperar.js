import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { verificarIdentidad, recuperarPassword } from "../../services/authServicio"

function usePaginaRecuperar() {

  const navigate = useNavigate()

  //PASO ACTUAL (1 = VERIFICAR, 2 = NUEVA CONTRASEÑA)
  const [paso, setPaso] = useState(1)

  //CAMPOS DEL PASO 1
  const [email, setEmail] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")

  //CAMPOS DEL PASO 2
  const [nuevaPassword, setNuevaPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")

  //MENSAJES
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  //PASO 1: VERIFICAR IDENTIDAD
  const verificar = async (e) => {
    e.preventDefault()
    setError("")

    //VALIDAMOS QUE NO ESTEN VACIOS
    if (!email.trim() || !fechaNacimiento) {
      setError("Rellena el email y la fecha de nacimiento")
      return
    }

    setCargando(true)
    try {
      await verificarIdentidad(email, fechaNacimiento)
      //SI LA IDENTIDAD ES CORRECTA PASAMOS AL PASO 2
      setPaso(2)
    } catch (err) {
      console.error("Error al verificar identidad", err)
      setError(err.response?.data?.message || "Los datos no coinciden")
    } finally {
      setCargando(false)
    }
  }

  //PASO 2: CAMBIAR LA CONTRASEÑA
  const cambiarPassword = async (e) => {
    e.preventDefault()
    setError("")

    //VALIDAMOS LA NUEVA CONTRASEÑA
    if (nuevaPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    if (nuevaPassword !== repetirPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setCargando(true)
    try {
      await recuperarPassword(email, fechaNacimiento, nuevaPassword)
      //CONTRASEÑA CAMBIADA, VOLVEMOS AL LOGIN
      navigate("/login")
    } catch (err) {
      console.error("Error al cambiar la contraseña", err)
      setError(err.response?.data?.message || "No se pudo cambiar la contraseña")
    } finally {
      setCargando(false)
    }
  }

  return {
    paso,
    email, setEmail,
    fechaNacimiento, setFechaNacimiento,
    nuevaPassword, setNuevaPassword,
    repetirPassword, setRepetirPassword,
    error,
    cargando,
    verificar,
    cambiarPassword,
    navigate
  }
}

export default usePaginaRecuperar