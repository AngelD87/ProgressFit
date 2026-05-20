import api from "./api"

//LLAMADA AL BACKEND PARA HACER LOGIN
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password })
  return response.data
}