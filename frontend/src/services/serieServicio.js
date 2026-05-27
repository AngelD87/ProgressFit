import api from "./api"

//AÑADIR SERIE
export const añadirSerie = async (datos) => {
  const response = await api.post("/series", datos)
  return response.data
}

//OBTENER SERIES DE UN EJERCICIO
export const obtenerSeriesDeEjercicio = async (idEntrenamientoEjercicio) => {
  const response = await api.get(`/series/entrenamiento-ejercicio/${idEntrenamientoEjercicio}`)
  return response.data
}

//ACTUALIZAR SERIE
export const actualizarSerie = async (id, datos) => {
  const response = await api.put(`/series/${id}`, datos)
  return response.data
}

//ELIMINAR SERIE
export const eliminarSerie = async (id) => {
  await api.delete(`/series/${id}`)
}