import api from "./api"

//LLAMADA AL BACKEND PARA HACER LOGIN
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password })
  return response.data
}

//PASO 1: VERIFICAR IDENTIDAD (EMAIL + FECHA DE NACIMIENTO)
export const verificarIdentidad = async (email, fechaNacimiento) => {
  await api.post("/auth/verificar-identidad", { email, fechaNacimiento })
}

//PASO 2: CAMBIAR LA CONTRASEÑA
export const recuperarPassword = async (email, fechaNacimiento, nuevaPassword) => {
  await api.post("/auth/recuperar-password", { email, fechaNacimiento, nuevaPassword })
}