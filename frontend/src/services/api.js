import axios from "axios"

//CREAMOS UNA INSTANCIA DE AXIOS CON LA URL BASE DEL BACKEND
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
})

//ANTES DE CADA PETICION AÑADIMOS EL TOKEN JWT AL HEADER SI EXISTE
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//SI EL BACKEND DEVUELVE 401 (NO AUTORIZADO) LIMPIAMOS LA SESION
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("usuario")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api