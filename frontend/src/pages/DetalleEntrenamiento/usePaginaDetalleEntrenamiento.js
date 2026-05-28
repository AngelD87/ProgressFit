import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { obtenerEntrenamientoCompleto, cerrarEntrenamiento, eliminarEntrenamiento, valorarEntrenamiento } from "../../services/entrenamientoServicio"
import { obtenerMusculos } from "../../services/musculoServicio"
import { obtenerEjerciciosPorMusculo } from "../../services/ejercicioServicio"
import { añadirEjercicio, eliminarEjercicioDeEntrenamiento, actualizarEjercicioEntrenamiento } from "../../services/entrenamientoEjercicioServicio"
import { añadirSerie, eliminarSerie } from "../../services/serieServicio"

function usePaginaDetalleEntrenamiento() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [entrenamiento, setEntrenamiento] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [musculos, setMusculos] = useState([])
  const [musculoSeleccionado, setMusculoSeleccionado] = useState(null)
  const [ejerciciosMusculo, setEjerciciosMusculo] = useState([])
  const [mostrarSelectorEjercicio, setMostrarSelectorEjercicio] = useState(false)
  const [mostrarModalValoracion, setMostrarModalValoracion] = useState(false)
  const [valoracion, setValoracion] = useState(0)
  const [fatigaPercibida, setFatigaPercibida] = useState(5)
  const [comentario, setComentario] = useState("")
  const [errorModal, setErrorModal] = useState("")
  const [errorPagina, setErrorPagina] = useState("")

  const cargarEntrenamiento = useCallback(async () => {
    try {
      const datos = await obtenerEntrenamientoCompleto(id)
      setEntrenamiento(datos)
    } catch (err) {
      console.error("Error al cargar entrenamiento", err)
    } finally {
      setCargando(false)
    }
  }, [id])

  const cargarMusculos = useCallback(async () => {
    try {
      const datos = await obtenerMusculos()
      setMusculos(datos)
    } catch (err) {
      console.error("Error al cargar músculos", err)
    }
  }, [])

  useEffect(() => {
    const cargar = async () => {
      await cargarEntrenamiento()
      await cargarMusculos()
    }
    cargar()
  }, [id, cargarEntrenamiento, cargarMusculos])

  const handleSeleccionarMusculo = async (musculo) => {
    setMusculoSeleccionado(musculo)
    try {
      const datos = await obtenerEjerciciosPorMusculo(musculo.idMusculo)
      setEjerciciosMusculo(datos)
    } catch (err) {
      console.error("Error al cargar ejercicios", err)
    }
    setMostrarSelectorEjercicio(true)
  }

  const handleAñadirEjercicio = async (ejercicio) => {
    try {
      const orden = (entrenamiento?.ejercicios?.length || 0) + 1
      await añadirEjercicio({
        idEntrenamiento: parseInt(id),
        idEjercicio: ejercicio.idEjercicio,
        orden
      })
      setMostrarSelectorEjercicio(false)
      setMusculoSeleccionado(null)
      setEjerciciosMusculo([])
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al añadir ejercicio", err)
    }
  }

  const handleEliminarEjercicio = async (idEntrenamientoEjercicio) => {
    try {
      await eliminarEjercicioDeEntrenamiento(idEntrenamientoEjercicio)
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al eliminar ejercicio", err)
    }
  }

  const handleMoverArriba = async (index) => {
    if (index === 0) return
    const ejercicios = entrenamiento.ejercicios
    const actual = ejercicios[index]
    const anterior = ejercicios[index - 1]
    const ordenTemporal = 9999
    try {
      await actualizarEjercicioEntrenamiento(actual.idEntrenamientoEjercicio, { orden: ordenTemporal })
      await actualizarEjercicioEntrenamiento(anterior.idEntrenamientoEjercicio, { orden: actual.orden })
      await actualizarEjercicioEntrenamiento(actual.idEntrenamientoEjercicio, { orden: anterior.orden })
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al mover ejercicio", err)
    }
  }

  const handleMoverAbajo = async (index) => {
    if (index === entrenamiento.ejercicios.length - 1) return
    const ejercicios = entrenamiento.ejercicios
    const actual = ejercicios[index]
    const siguiente = ejercicios[index + 1]
    const ordenTemporal = 9999
    try {
      await actualizarEjercicioEntrenamiento(actual.idEntrenamientoEjercicio, { orden: ordenTemporal })
      await actualizarEjercicioEntrenamiento(siguiente.idEntrenamientoEjercicio, { orden: actual.orden })
      await actualizarEjercicioEntrenamiento(actual.idEntrenamientoEjercicio, { orden: siguiente.orden })
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al mover ejercicio", err)
    }
  }

  const handleAñadirSerie = async (idEntrenamientoEjercicio, peso, repeticiones, rir) => {
    try {
      const ejercicio = entrenamiento.ejercicios.find(
        e => e.idEntrenamientoEjercicio === idEntrenamientoEjercicio
      )
      const numeroSerie = (ejercicio?.series?.length || 0) + 1
      await añadirSerie({
        idEntrenamientoEjercicio,
        numeroSerie,
        peso: parseFloat(peso),
        repeticiones: parseInt(repeticiones),
        rir: rir ? parseInt(rir) : null
      })
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al añadir serie", err)
    }
  }

  const handleEliminarSerie = async (idSerie) => {
    try {
      await eliminarSerie(idSerie)
      await cargarEntrenamiento()
    } catch (err) {
      console.error("Error al eliminar serie", err)
    }
  }

  const handleAbrirValoracion = () => {
    if (!entrenamiento?.ejercicios || entrenamiento.ejercicios.length === 0) {
      setErrorPagina("No puedes finalizar un entrenamiento sin ejercicios")
      return
    }
    setErrorPagina("")
    setValoracion(entrenamiento?.valoracion || 0)
    setFatigaPercibida(entrenamiento?.fatigaPercibida || 5)
    setComentario(entrenamiento?.comentario || "")
    setErrorModal("")
    setMostrarModalValoracion(true)
  }

const handleFinalizarSinValorar = async () => {
  if (!entrenamiento?.ejercicios || entrenamiento.ejercicios.length === 0) {
    setErrorPagina("No puedes finalizar un entrenamiento sin ejercicios")
    return
  }
  try {
    await cerrarEntrenamiento(parseInt(id), {})
    navigate("/dashboard")
  } catch (err) {
    setErrorPagina(err.response?.data?.message || "Error al finalizar")
  }
}

const handleFinalizarConValoracion = async () => {
  if (!valoracion || valoracion === 0) {
    setErrorModal("Selecciona una valoración con las estrellas")
    return
  }
  try {
    await cerrarEntrenamiento(parseInt(id), {
      valoracion: valoracion,
      fatigaPercibida: fatigaPercibida,
      comentario: comentario || null
    })
    navigate("/dashboard")
  } catch (err) {
    setErrorModal(err.response?.data?.message || "Error al finalizar")
  }
}

const handleGuardarValoracion = async () => {
  if (!valoracion || valoracion === 0) {
    setErrorModal("Selecciona una valoración con las estrellas")
    return
  }
  try {
    await valorarEntrenamiento(parseInt(id), {
      valoracion: valoracion,
      fatigaPercibida: fatigaPercibida,
      comentario: comentario || null
    })
    setMostrarModalValoracion(false)
    await cargarEntrenamiento()
  } catch (err) {
    setErrorModal(err.response?.data?.message || "Error al valorar")
  }
}

  const handleEliminar = async () => {
    try {
      await eliminarEntrenamiento(parseInt(id))
      navigate("/dashboard")
    } catch (err) {
      console.error("Error al eliminar entrenamiento", err)
    }
  }

  return {
    entrenamiento,
    cargando,
    musculos,
    musculoSeleccionado,
    ejerciciosMusculo,
    mostrarSelectorEjercicio,
    setMostrarSelectorEjercicio,
    handleSeleccionarMusculo,
    handleAñadirEjercicio,
    handleEliminarEjercicio,
    handleMoverArriba,
    handleMoverAbajo,
    handleAñadirSerie,
    handleEliminarSerie,
    handleEliminar,
    mostrarModalValoracion,
    setMostrarModalValoracion,
    valoracion,
    setValoracion,
    fatigaPercibida,
    setFatigaPercibida,
    comentario,
    setComentario,
    errorModal,
    errorPagina,
    handleAbrirValoracion,
    handleFinalizarSinValorar,
    handleFinalizarConValoracion,
    handleGuardarValoracion,
    navigate
  }
}

export default usePaginaDetalleEntrenamiento