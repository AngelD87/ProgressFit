import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { guardarAvatar } from "../../services/usuarioServicio"
import listaAvatares from "../../assets/avatares/listaAvatares"

function usePaginaSeleccionAvatar() {

  const { usuario, login, token } = useAuth()
  const navigate = useNavigate()

  //CATEGORIA DEL FILTRO
  const [categoria, setCategoria] = useState("todos")

  //AVATAR SELECCIONADO
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null)

  //CARGANDO MIENTRAS SE GUARDA
  const [cargando, setCargando] = useState(false)

  //FILTRAMOS
  const avataresFiltrados = categoria === "todos"
    ? listaAvatares
    : listaAvatares.filter(a => a.categoria === categoria)

  //GUARDAR AVATAR
  const handleConfirmar = async () => {
    if (!avatarSeleccionado) return
    setCargando(true)

    try {
      //GUARDAMOS AVATAR
      const usuarioActualizado = await guardarAvatar(usuario.idUsuario, avatarSeleccionado.id)

      //ACTUALIZAMOS USUARIO
      login(usuarioActualizado, token)

      navigate("/dashboard")

    } catch (err) {
      console.error("Error al guardar el avatar", err)
    } finally {
      setCargando(false)
    }
  }

  return {
    usuario,
    categoria,
    setCategoria,
    avataresFiltrados,
    avatarSeleccionado,
    setAvatarSeleccionado,
    cargando,
    handleConfirmar
  }
}

export default usePaginaSeleccionAvatar