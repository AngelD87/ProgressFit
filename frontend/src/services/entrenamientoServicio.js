import api from "./api"

//OBTENER TODOS LOS ENTRENAMIENTOS DE UN USUARIO
export const obtenerEntrenamientos = async (idUsuario) => {
  const response = await api.get(`/entrenamientos/usuario/${idUsuario}`)
  return response.data
}

//OBTENER UN ENTRENAMIENTO COMPLETO CON EJERCICIOS Y SERIES
export const obtenerEntrenamientoCompleto = async (id) => {
  const response = await api.get(`/entrenamientos/${id}/completo`)
  return response.data
}

//CREAR ENTRENAMIENTO
export const crearEntrenamiento = async (datos) => {
  const response = await api.post("/entrenamientos", datos)
  return response.data
}

//CERRAR ENTRENAMIENTO
export const cerrarEntrenamiento = async (id, datos) => {
  const response = await api.put(`/entrenamientos/${id}/cerrar`, datos)
  return response.data
}

//ELIMINAR ENTRENAMIENTO
export const eliminarEntrenamiento = async (id) => {
  await api.delete(`/entrenamientos/${id}`)
}

//VALORAR ENTRENAMIENTO YA CERRADO
export const valorarEntrenamiento = async (id, datos) => {
  const response = await api.put(`/entrenamientos/${id}/valorar`, datos)
  return response.data
}

//OBTENER TODOS LOS ENTRENAMIENTOS COMPLETOS DEL USUARIO
export const obtenerEntrenamientosCompletos = async (idUsuario) => {
  const response = await api.get(`/entrenamientos/usuario/${idUsuario}/completos`)
  return response.data
}