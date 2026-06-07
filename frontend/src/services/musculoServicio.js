import api from "./api"

//OBTENER TODOS LOS MUSCULOS
export const obtenerMusculos = async () => {
  const response = await api.get("/musculos")
  return response.data
}

//CREAR MUSCULO
export const crearMusculo = async (datos) => {
  const response = await api.post("/musculos", datos)
  return response.data
}

//ACTUALIZAR MUSCULO
export const actualizarMusculo = async (id, datos) => {
  const response = await api.put(`/musculos/${id}`, datos)
  return response.data
}

//ELIMINAR MUSCULO
export const eliminarMusculo = async (id) => {
  await api.delete(`/musculos/${id}`)
}