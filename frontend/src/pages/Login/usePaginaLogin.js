import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { login } from "../../services/authServicio"

function usePaginaLogin() {

  //FORMULARIO
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  //HOOKS DE NAVEGACION Y CONTEXTO
  const navigate = useNavigate()
  const { login: guardarSesion } = useAuth()

  //CUANDO ENVIAMOS EL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    try {
      //COMPROBAMOS EL USUARIO
      const datos = await login(email, password)

      //GUARDAMOS SESIÓM
      guardarSesion(datos, datos.token)

      //REDIRIGIMOS SEGUN EL ROL Y SI TIENE AVATAR
      if (datos.rol === "ADMIN") {
        navigate("/admin")
      } else if (!datos.avatar) {
        navigate("/seleccionar-avatar")
      } else {
        navigate("/dashboard")
      }

    } catch {
      setError("Email o contraseña incorrectos")
    } finally {
      setCargando(false)
    }
  }

  //DEVOLVEMOS TODO LO QUE NECESITA EL HTML
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    cargando,
    handleSubmit,
    navigate
  }
}

export default usePaginaLogin