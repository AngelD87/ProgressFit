import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { login } from "../../services/authServicio"

function usePaginaLogin() {

  //ESTADOS DEL FORMULARIO
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
      //LLAMADA AL BACKEND
      const datos = await login(email, password)

      //GUARDAMOS EL TOKEN
      const tokenJwt = datos.token

      //CREAMOS EL OBJETO USUARIO SIN EL TOKEN
      const datosUsuario = {
        idUsuario: datos.idUsuario,
        nombre: datos.nombre,
        email: datos.email,
        pesoCorporal: datos.pesoCorporal,
        altura: datos.altura,
        fechaNacimiento: datos.fechaNacimiento,
        sexo: datos.sexo,
        avatar: datos.avatar,
        rol: datos.rol,
        isActive: datos.isActive
      }

      //GUARDAMOS LA SESION EN EL CONTEXTO
      guardarSesion(datosUsuario, tokenJwt)

      //REDIRIGIMOS SEGUN EL ROL Y SI TIENE AVATAR
      if (datosUsuario.rol === "ADMIN") {
        navigate("/admin")
      } else if (!datosUsuario.avatar) {
        navigate("/seleccionar-avatar")
      } else {
        navigate("/dashboard")
      }

    } catch (err) {
      console.error("Error login:", err)
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