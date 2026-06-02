import api from "./api"

//GUARDAR EL PESO DE HOY
export const guardarPeso = async (idUsuario, peso) => {
  const response = await api.post("/registros-peso", { idUsuario, peso })
  return response.data
}

//HISTORIAL DE PESOS DEL USUARIO
export const obtenerHistorialPeso = async (idUsuario) => {
  const response = await api.get(`/registros-peso/usuario/${idUsuario}`)
  return response.data
}