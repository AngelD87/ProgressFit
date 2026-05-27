import api from "./api"

//AÑADIR EJERCICIO AL ENTRENAMIENTO
export const añadirEjercicio = async (datos) => {
  const response = await api.post("/entrenamiento-ejercicios", datos)
  return response.data
}

//OBTENER EJERCICIOS DE UN ENTRENAMIENTO
export const obtenerEjerciciosDeEntrenamiento = async (idEntrenamiento) => {
  const response = await api.get(`/entrenamiento-ejercicios/entrenamiento/${idEntrenamiento}`)
  return response.data
}

//ACTUALIZAR ORDEN DEL EJERCICIO
export const actualizarEjercicioEntrenamiento = async (id, datos) => {
  const response = await api.put(`/entrenamiento-ejercicios/${id}`, datos)
  return response.data
}

//ELIMINAR EJERCICIO DEL ENTRENAMIENTO
export const eliminarEjercicioDeEntrenamiento = async (id) => {
  await api.delete(`/entrenamiento-ejercicios/${id}`)
}