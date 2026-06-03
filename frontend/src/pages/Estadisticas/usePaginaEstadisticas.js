import { useState, useEffect } from "react"
import { useAuth } from "../../context/useAuth"
import { obtenerEntrenamientosCompletos } from "../../services/entrenamientoServicio"

function usePaginaEstadisticas() {

  const { usuario } = useAuth()
  const [entrenamientos, setEntrenamientos] = useState([])
  const [cargando, setCargando] = useState(true)

  const [musculoSeleccionado, setMusculoSeleccionado] = useState("")
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("")

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerEntrenamientosCompletos(usuario.idUsuario)
        setEntrenamientos(datos)
      } catch (err) {
        console.error("Error al cargar estadísticas", err)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [usuario.idUsuario])

  //AL CAMBIAR MUSCULO RESETEAMOS EL EJERCICIO
  const handleMusculoChange = (idMusculo) => {
    setMusculoSeleccionado(idMusculo)
    setEjercicioSeleccionado("")
  }

  //MUSCULOS QUE HA TRABAJADO EL USUARIO
  const listaMusculos = () => {
    const musculos = new Map()
    entrenamientos.forEach(ent => {
      ent.ejercicios?.forEach(ej => {
        if (ej.idMusculo && !musculos.has(ej.idMusculo)) {
          musculos.set(ej.idMusculo, ej.nombreMusculo)
        }
      })
    })
    return Array.from(musculos.entries()).map(([id, nombre]) => ({ id, nombre }))
  }

  //EJERCICIOS DEL MUSCULO SELECCIONADO
  const listaEjerciciosPorMusculo = () => {
    if (!musculoSeleccionado) return []
    const idMus = parseInt(musculoSeleccionado)
    const ejercicios = new Map()
    entrenamientos.forEach(ent => {
      ent.ejercicios?.forEach(ej => {
        if (ej.idMusculo === idMus && !ejercicios.has(ej.idEjercicio)) {
          ejercicios.set(ej.idEjercicio, ej.nombreEjercicio)
        }
      })
    })
    return Array.from(ejercicios.entries()).map(([id, nombre]) => ({ id, nombre }))
  }

  //PESO MAXIMO POR SESION DE UN EJERCICIO (ULTIMAS 15 SESIONES)
  const datosProgresion = () => {
    if (!ejercicioSeleccionado) return []
    const idEj = parseInt(ejercicioSeleccionado)
    const datos = []
    entrenamientos.forEach(ent => {
      const ejercicio = ent.ejercicios?.find(e => e.idEjercicio === idEj)
      if (ejercicio && ejercicio.series?.length > 0) {
        const pesoMax = Math.max(...ejercicio.series.map(s => s.peso))
        datos.push({
          fecha: fechaCorta(new Date(ent.inicio)),
          pesoMax
        })
      }
    })
    return datos.slice(-15)
  }

  //FATIGA DE CADA ENTRENAMIENTO (ULTIMOS 15)
  const datosFatiga = () => {
    return entrenamientos
      .filter(e => e.fatigaPercibida != null)
      .map(e => ({
        fecha: fechaCorta(new Date(e.inicio)),
        fatiga: e.fatigaPercibida,
        nombre: e.nombre
      }))
      .slice(-15)
  }

  //ENTRENAMIENTOS AGRUPADOS POR SEMANA
  const datosEntrenamientosSemana = () => {
    const semanas = {}
    entrenamientos.forEach(ent => {
      const fecha = new Date(ent.inicio)
      const clave = claveISO(fecha)
      const etiqueta = etiquetaSemana(fecha)
      if (!semanas[clave]) {
        semanas[clave] = { etiqueta, count: 0 }
      }
      semanas[clave].count += 1
    })
    return Object.entries(semanas)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-8)
      .map(([, v]) => ({ semana: v.etiqueta, entrenamientos: v.count }))
  }

  //VALORACION DE CADA ENTRENAMIENTO (ULTIMOS 15)
  const datosValoracion = () => {
    return entrenamientos
      .filter(e => e.valoracion != null)
      .map(e => ({
        fecha: fechaCorta(new Date(e.inicio)),
        valoracion: e.valoracion,
        nombre: e.nombre
      }))
      .slice(-15)
  }

  //DEVUELVE FECHA CORTA TIPO "19 MAY"
  const fechaCorta = (fecha) => {
    return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  //CLAVE UNICA POR SEMANA PARA AGRUPAR
  const claveISO = (fecha) => {
    const tmp = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()))
    const dia = tmp.getUTCDay() || 7
    tmp.setUTCDate(tmp.getUTCDate() + 4 - dia)
    const año = tmp.getUTCFullYear()
    const semana = Math.ceil(((tmp - new Date(Date.UTC(año, 0, 1))) / 86400000 + 1) / 7)
    return `${año}-W${String(semana).padStart(2, "0")}`
  }

  //DEVUELVE EL LUNES DE ESA SEMANA COMO ETIQUETA
  const etiquetaSemana = (fecha) => {
    const tmp = new Date(fecha)
    const dia = tmp.getDay() || 7
    tmp.setDate(tmp.getDate() - dia + 1)
    return tmp.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  return {
    entrenamientos,
    cargando,
    musculoSeleccionado,
    handleMusculoChange,
    listaMusculos,
    ejercicioSeleccionado,
    setEjercicioSeleccionado,
    listaEjerciciosPorMusculo,
    datosProgresion,
    datosFatiga,
    datosEntrenamientosSemana,
    datosValoracion
  }
}

export default usePaginaEstadisticas