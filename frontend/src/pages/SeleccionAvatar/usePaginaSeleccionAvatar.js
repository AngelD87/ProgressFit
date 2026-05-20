import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { guardarAvatar } from "../../services/usuarioServicio"
import listaAvatares from "../../assets/avatares/listaAvatares"

function usePaginaSeleccionAvatar() {

  const { usuario, login } = useAuth()
  const navigate = useNavigate()

  const [categoria, setCategoria] = useState("todos")
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(false)

  const avataresFiltrados = categoria === "todos"
    ? listaAvatares
    : listaAvatares.filter(a => a.categoria === categoria)

  const handleConfirmar = async () => {
    if (!avatarSeleccionado) return
    setCargando(true)

    try {
      const usuarioActualizado = await guardarAvatar(usuario.idUsuario, avatarSeleccionado.id)

      //LEEMOS EL TOKEN DIRECTAMENTE DEL LOCALSTORAGE PARA NO PERDERLO
      const tokenGuardado = localStorage.getItem("token")

      //ACTUALIZAMOS EL CONTEXTO CON EL USUARIO Y EL TOKEN
      login(usuarioActualizado, tokenGuardado)

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