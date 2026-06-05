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
    if (periodo === 0) return historial
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

  //CALCULA LA EDAD A PARTIR DE LA FECHA DE NACIMIENTO
  const calcularEdad = () => {
    if (!usuario?.fechaNacimiento) return null
    const nacimiento = new Date(usuario.fechaNacimiento)
    const hoy = new Date()
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    //SI AUN NO HA CUMPLIDO ESTE AÑO RESTAMOS UNO
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  //COMPRUEBA SI TENEMOS TODOS LOS DATOS PARA CALCULAR CALORIAS
  const datosCompletos = () => {
    return (
      usuario?.pesoCorporal &&
      usuario?.altura &&
      usuario?.sexo &&
      usuario?.nivelActividad &&
      usuario?.pesoObjetivo &&
      calcularEdad() != null
    )
  }

  //METABOLISMO BASAL (MIFFLIN-ST JEOR)
  const calcularTmb = () => {
    if (!datosCompletos()) return null
    const peso = usuario.pesoCorporal
    const alturaCm = usuario.altura * 100
    const edad = calcularEdad()
    //BASE COMUN PARA HOMBRE Y MUJER
    const base = (10 * peso) + (6.25 * alturaCm) - (5 * edad)
    //EL FINAL CAMBIA SEGUN EL SEXO
    if (usuario.sexo === "HOMBRE") {
      return base + 5
    }
    return base - 161
  }

  //GASTO TOTAL DIARIO (TMB POR FACTOR DE ACTIVIDAD)
  const calcularTdee = () => {
    const tmb = calcularTmb()
    if (tmb == null) return null
    const factores = {
      SEDENTARIO: 1.2,
      LIGERO: 1.375,
      MODERADO: 1.55,
      ACTIVO: 1.725,
      MUY_ACTIVO: 1.9
    }
    const factor = factores[usuario.nivelActividad]
    return tmb * factor
  }

  //CALORIAS RECOMENDADAS SEGUN EL OBJETIVO
  const caloriasObjetivo = () => {
    const tdee = calcularTdee()
    if (tdee == null) return null
    const pesoActual = usuario.pesoCorporal
    const objetivo = usuario.pesoObjetivo
    let calorias = tdee
    //SI QUIERE ADELGAZAR DEFICIT DE 500
    if (objetivo < pesoActual) {
      calorias = tdee - 500
    }
    //SI QUIERE GANAR SUPERAVIT DE 500
    else if (objetivo > pesoActual) {
      calorias = tdee + 500
    }
    //SI ES IGUAL SE MANTIENE EL TDEE
    return Math.round(calorias)
  }

  //DEVUELVE EL TEXTO DEL OBJETIVO (PERDER, GANAR O MANTENER)
  const tipoObjetivo = () => {
    if (!usuario?.pesoObjetivo || !usuario?.pesoCorporal) return ""
    if (usuario.pesoObjetivo < usuario.pesoCorporal) return "Perder peso"
    if (usuario.pesoObjetivo > usuario.pesoCorporal) return "Ganar peso"
    return "Mantener peso"
  }

  //CUANTO FALTA PARA EL OBJETIVO
  const faltaParaObjetivo = () => {
    if (!usuario?.pesoObjetivo || !usuario?.pesoCorporal) return null
    return Math.round(Math.abs(usuario.pesoCorporal - usuario.pesoObjetivo) * 10) / 10
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
    datosGrafica,
    datosCompletos,
    caloriasObjetivo,
    tipoObjetivo,
    faltaParaObjetivo
  }
}

export default usePaginaProgreso