import { useState, useEffect } from "react"
import { useAuth } from "../../../../context/useAuth"
import {
  obtenerUsuarios,
  actualizarUsuarioAdmin
} from "../../../../services/usuarioServicio"

function useGestionUsuarios() {

  const { usuario } = useAuth()

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  //BUSCADOR Y LIMITE DE LA LISTA
  const [busqueda, setBusqueda] = useState("")
  const [limite, setLimite] = useState(10)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      setCargando(true)
      const datos = await obtenerUsuarios()
      setUsuarios(datos)
    } catch (err) {
      console.error("Error al cargar usuarios", err)
      setError("No se pudieron cargar los usuarios")
    } finally {
      setCargando(false)
    }
  }

  //FILTRA POR NOMBRE O EMAIL Y CORTA AL LIMITE
  const usuariosMostrados = () => {
    const texto = busqueda.toLowerCase()
    const filtrados = usuarios.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    )
    if (limite === "todos") {
      return filtrados
    }
    return filtrados.slice(0, limite)
  }

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await actualizarUsuarioAdmin(id, { rol: nuevoRol })
      setUsuarios(usuarios.map(u =>
        u.idUsuario === id ? { ...u, rol: nuevoRol } : u
      ))
    } catch (err) {
      console.error("Error al cambiar el rol", err)
      setError("No se pudo cambiar el rol")
    }
  }

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarUsuarioAdmin(id, { isActive: nuevoEstado })
      setUsuarios(usuarios.map(u =>
        u.idUsuario === id ? { ...u, isActive: nuevoEstado } : u
      ))
    } catch (err) {
      console.error("Error al cambiar el estado", err)
      setError("No se pudo cambiar el estado")
    }
  }

  return {
    usuario,
    usuarios,
    cargando,
    error,
    busqueda, setBusqueda,
    limite, setLimite,
    usuariosMostrados,
    cambiarRol,
    cambiarEstado
  }
}

export default useGestionUsuarios