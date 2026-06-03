import { useState, useEffect } from "react"
import { useAuth } from "../../context/useAuth"
import { obtenerHistorialPeso } from "../../services/registroPesoServicio"

function usePaginaProgreso() {

  const { usuario } = useAuth()
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando] = useState(true)

  //PERIODO SELECCIONADO PARA LA GRAFICA (1, 3, 6 MESES O 0 = TODO)
  const [periodo, setPeriodo] = useState(3)

  //CARGAMOS EL HISTORIAL DE PESO DEL USUARIO
  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await obtenerHistorialPeso(usuario.idUsuario)
        setHistorial(datos)
      } catch (err) {
        console.error("Error al cargar el historial de peso", err)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [usuario.idUsuario])

  //CALCULAMOS EL IMC CON EL PESO ACTUAL Y LA ALTURA
  const calcularImc = () => {
    if (!usuario?.pesoCorporal || !usuario?.altura) return null
    const imc = usuario.pesoCorporal / (usuario.altura * usuario.altura)
    return Math.round(imc * 10) / 10
  }

  //DEVUELVE LA CATEGORIA DEL IMC
  const categoriaImc = (imc) => {
    if (imc == null) return ""
    if (imc < 18.5) return "Bajo peso"
    if (imc < 25) return "Peso normal"
    if (imc < 30) return "Sobrepeso"
    return "Obesidad"
  }

  //DEVUELVE UN COLOR SEGUN LA CATEGORIA
  const colorImc = (imc) => {
    if (imc == null) return "#aaa"
    if (imc < 18.5) return "#4f9fff"
    if (imc < 25) return "#4caf50"
    if (imc < 30) return "#f5c518"
    return "#ff7777"
  }

  //PESO MAS BAJO REGISTRADO (TODO EL HISTORIAL)
  const pesoMinimo = () => {
    if (historial.length === 0) return null
    return Math.min(...historial.map(r => r.peso))
  }

  //PESO MAS ALTO REGISTRADO (TODO EL HISTORIAL)
  const pesoMaximo = () => {
    if (historial.length === 0) return null
    return Math.max(...historial.map(r => r.peso))
  }

  //VARIACION DESDE EL PRIMER REGISTRO (TODO EL HISTORIAL)
  const variacionTotal = () => {
    if (historial.length < 2) return null
    const primero = historial[0].peso
    const ultimo = historial[historial.length - 1].peso
    return Math.round((ultimo - primero) * 10) / 10
  }

  //FILTRA EL HISTORIAL SEGUN EL PERIODO ELEGIDO
  const historialFiltrado = () => {
    //SI EL PERIODO ES 0 DEVOLVEMOS TODO
    if (periodo === 0) return historial

    //CALCULAMOS LA FECHA LIMITE (HOY MENOS LOS MESES DEL PERIODO)
    const limite = new Date()
    limite.setMonth(limite.getMonth() - periodo)

    return historial.filter(r => new Date(r.fecha) >= limite)
  }

  //PREPARAMOS LOS DATOS DE LA GRAFICA CON FECHA LEGIBLE
  const datosGrafica = () => {
    return historialFiltrado().map(r => ({
      fecha: fechaCorta(new Date(r.fecha)),
      peso: r.peso
    }))
  }

  //DEVUELVE FECHA CORTA TIPO "19 MAY"
  const fechaCorta = (fecha) => {
    return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  return {
    usuario,
    historial,
    cargando,
    periodo,
    setPeriodo,
    calcularImc,
    categoriaImc,
    colorImc,
    pesoMinimo,
    pesoMaximo,
    variacionTotal,
    datosGrafica
  }
}

export default usePaginaProgreso