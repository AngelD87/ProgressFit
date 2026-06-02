import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { actualizarUsuario as actualizarUsuarioApi } from "../../services/usuarioServicio"
import { guardarPeso } from "../../services/registroPesoServicio"

function usePaginaPerfil() {

  const { usuario, actualizarUsuario } = useAuth()
  const navigate = useNavigate()

  //DATOS DEL USUARIO
  const [nombre, setNombre] = useState("")
  const [altura, setAltura] = useState("")
  const [password, setPassword] = useState("")

  //PESO (SECCION APARTE)
  const [peso, setPeso] = useState("")

  //MENSAJES
  const [errorDatos, setErrorDatos] = useState("")
  const [okDatos, setOkDatos] = useState("")
  const [errorPeso, setErrorPeso] = useState("")
  const [okPeso, setOkPeso] = useState("")
  const [cargandoDatos, setCargandoDatos] = useState(false)
  const [cargandoPeso, setCargandoPeso] = useState(false)

  //RELLENAMOS LOS CAMPOS CON LOS DATOS ACTUALES
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "")
      setAltura(usuario.altura || "")
      setPeso(usuario.pesoCorporal || "")
    }
  }, [usuario])

  //GUARDA NOMBRE, ALTURA Y CONTRASEÑA
  const handleGuardarDatos = async (e) => {
    e.preventDefault()
    setErrorDatos("")
    setOkDatos("")

    //VALIDAMOS EL NOMBRE
    if (!nombre.trim()) {
      setErrorDatos("El nombre no puede estar vacío")
      return
    }

    //VALIDAMOS LA CONTRASEÑA SOLO SI HA ESCRITO UNA NUEVA
    if (password.trim() && password.trim().length < 6) {
      setErrorDatos("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setCargandoDatos(true)
    try {
      const datos = {
        nombre,
        altura: altura ? parseFloat(altura) : null
      }
      //SOLO MANDAMOS LA CONTRASEÑA SI HA ESCRITO UNA NUEVA
      if (password.trim()) {
        datos.password = password
      }
      const usuarioActualizado = await actualizarUsuarioApi(usuario.idUsuario, datos)
      actualizarUsuario(usuarioActualizado)
      setPassword("")
      setOkDatos("Datos guardados correctamente")
    } catch (err) {
      setErrorDatos(err.response?.data?.message || "Error al guardar los datos")
    } finally {
      setCargandoDatos(false)
    }
  }

  //GUARDA EL PESO (CREA REGISTRO EN EL HISTORIAL)
  const handleGuardarPeso = async (e) => {
    e.preventDefault()
    setErrorPeso("")
    setOkPeso("")

    //VALIDAMOS QUE HAY UN PESO VALIDO
    if (!peso || parseFloat(peso) < 30 || parseFloat(peso) > 300) {
      setErrorPeso("El peso debe estar entre 30 y 300kg")
      return
    }

    setCargandoPeso(true)
    try {
      await guardarPeso(usuario.idUsuario, parseFloat(peso))
      //ACTUALIZAMOS EL CONTEXTO PARA QUE EL DASHBOARD VEA EL PESO NUEVO
      actualizarUsuario({ ...usuario, pesoCorporal: parseFloat(peso) })
      setOkPeso("Peso actualizado correctamente")
    } catch (err) {
      setErrorPeso(err.response?.data?.message || "Error al actualizar el peso")
    } finally {
      setCargandoPeso(false)
    }
  }

  return {
    usuario,
    nombre, setNombre,
    altura, setAltura,
    password, setPassword,
    peso, setPeso,
    errorDatos, okDatos,
    errorPeso, okPeso,
    cargandoDatos, cargandoPeso,
    handleGuardarDatos,
    handleGuardarPeso,
    navigate
  }
}

export default usePaginaPerfil