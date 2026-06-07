import { useState, useEffect } from "react"
import {
  obtenerMusculos,
  crearMusculo,
  actualizarMusculo
} from "../../../../services/musculoServicio"

function useGestionMusculos() {

  const [musculos, setMusculos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  //ESTADOS DEL FORMULARIO
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    cargarMusculos()
  }, [])

  const cargarMusculos = async () => {
    try {
      setCargando(true)
      const datos = await obtenerMusculos()
      setMusculos(datos)
    } catch (err) {
      console.error("Error al cargar músculos", err)
      setError("No se pudieron cargar los músculos")
    } finally {
      setCargando(false)
    }
  }

  //RELLENA EL FORMULARIO PARA EDITAR
  const editarMusculo = (m) => {
    setEditando(m.idMusculo)
    setNombre(m.nombre)
    setDescripcion(m.descripcion || "")
    setError("")
  }

  //VACIA EL FORMULARIO
  const limpiarForm = () => {
    setEditando(null)
    setNombre("")
    setDescripcion("")
  }

  //GUARDA EL MUSCULO (CREA O EDITA)
  const guardarMusculo = async (e) => {
    e.preventDefault()
    setError("")

    //VALIDAMOS EL NOMBRE
    if (!nombre.trim()) {
      setError("El nombre del músculo es obligatorio")
      return
    }

    const datos = { nombre, descripcion }

    try {
      if (editando) {
        const actualizado = await actualizarMusculo(editando, datos)
        setMusculos(musculos.map(m => m.idMusculo === editando ? actualizado : m))
      } else {
        const nuevo = await crearMusculo(datos)
        setMusculos([...musculos, nuevo])
      }
      limpiarForm()
    } catch (err) {
      console.error("Error al guardar el músculo", err)
      setError(err.response?.data?.message || "No se pudo guardar el músculo")
    }
  }

  return {
    musculos,
    cargando,
    error,
    nombre, setNombre,
    descripcion, setDescripcion,
    editando,
    editarMusculo,
    limpiarForm,
    guardarMusculo
  }
}

export default useGestionMusculos