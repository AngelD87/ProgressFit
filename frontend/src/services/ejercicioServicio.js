import api from "./api"

//OBTENER TODOS LOS EJERCICIOS
export const obtenerEjercicios = async () => {
  const response = await api.get("/ejercicios")
  return response.data
}

//OBTENER EJERCICIOS POR MUSCULO
export const obtenerEjerciciosPorMusculo = async (idMusculo) => {
  const response = await api.get(`/ejercicios/musculo/${idMusculo}`)
  return response.data
}

//CREAR EJERCICIO
export const crearEjercicio = async (datos) => {
  const response = await api.post("/ejercicios", datos)
  return response.data
}

//ACTUALIZAR EJERCICIO
export const actualizarEjercicio = async (id, datos) => {
  const response = await api.put(`/ejercicios/${id}`, datos)
  return response.data
}

//ELIMINAR EJERCICIO
export const eliminarEjercicio = async (id) => {
  await api.delete(`/ejercicios/${id}`)
}