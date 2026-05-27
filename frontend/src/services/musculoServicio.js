import api from "./api"

//OBTENER TODOS LOS MUSCULOS
export const obtenerMusculos = async () => {
  const response = await api.get("/musculos")
  return response.data
}