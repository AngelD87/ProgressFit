import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { crearUsuario } from "../../services/usuarioServicio"

function usePaginaRegistro() {

  //ESTADOS DEL FORMULARIO
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pesoCorporal, setPesoCorporal] = useState("")
  const [altura, setAltura] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate()

  //REGISTRO
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    try {
      //CREAMOS EL USUARIO
      await crearUsuario({
        nombre,
        email,
        password,
        pesoCorporal: pesoCorporal ? parseFloat(pesoCorporal) : null,
        altura: altura ? parseFloat(altura) : null
      })

      //VOLVEMOS AL LOGIN
      navigate("/login")

    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse")
    } finally {
      setCargando(false)
    }
  }

  return {
    nombre, setNombre,
    email, setEmail,
    password, setPassword,
    pesoCorporal, setPesoCorporal,
    altura, setAltura,
    error,
    cargando,
    handleSubmit,
    navigate
  }
}

export default usePaginaRegistro