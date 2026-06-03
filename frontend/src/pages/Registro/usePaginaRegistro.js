import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { crearUsuario, comprobarEmail } from "../../services/usuarioServicio"

function usePaginaRegistro() {

  //ESTADOS DEL FORMULARIO
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pesoCorporal, setPesoCorporal] = useState("")
  const [altura, setAltura] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [sexo, setSexo] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  //PASO ACTUAL DEL FORMULARIO (1, 2 O 3)
  const [paso, setPaso] = useState(1)

  const navigate = useNavigate()

  //AVANZAR AL SIGUIENTE PASO VALIDANDO EL ACTUAL
  const siguientePaso = async () => {
    setError("")

    //VALIDACIONES DEL PASO 1 (CUENTA)
    if (paso === 1) {
      if (!nombre.trim()) {
        setError("El nombre es obligatorio")
        return
      }
      if (nombre.trim().length < 2 || nombre.trim().length > 50) {
        setError("El nombre debe tener entre 2 y 50 caracteres")
        return
      }
      if (!email.trim()) {
        setError("El email es obligatorio")
        return
      }
      if (!password.trim()) {
        setError("La contraseña es obligatoria")
        return
      }
      if (password.trim().length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        return
      }

      //COMPROBAMOS EN EL BACKEND SI EL EMAIL YA EXISTE
      try {
        setCargando(true)
        const existe = await comprobarEmail(email.trim())
        if (existe) {
          setError("Ese email ya está registrado")
          return
        }
      } catch (err) {
        console.error("Error al comprobar email", err)
        setError("No se pudo comprobar el email, inténtalo de nuevo")
        return
      } finally {
        setCargando(false)
      }
    }

    //VALIDACIONES DEL PASO 2 (SOBRE TI)
    if (paso === 2) {
      if (!fechaNacimiento) {
        setError("Indica tu fecha de nacimiento")
        return
      }
      if (!sexo) {
        setError("Selecciona tu sexo")
        return
      }
    }

    //SI TODO OK AVANZAMOS
    setPaso(paso + 1)
  }

  //VOLVER AL PASO ANTERIOR
  const pasoAnterior = () => {
    setError("")
    setPaso(paso - 1)
  }

  //REGISTRO FINAL (PASO 3)
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
        altura: altura ? parseFloat(altura) : null,
        fechaNacimiento,
        sexo
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
    fechaNacimiento, setFechaNacimiento,
    sexo, setSexo,
    error,
    cargando,
    paso,
    siguientePaso,
    pasoAnterior,
    handleSubmit,
    navigate
  }
}

export default usePaginaRegistro