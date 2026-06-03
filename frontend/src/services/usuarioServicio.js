import api from "./api"

//OBTENER TODOS LOS USUARIOS (SOLO ADMIN)
export const obtenerUsuarios = async () => {
  const response = await api.get("/usuarios")
  return response.data
}

//OBTENER UN USUARIO POR ID
export const obtenerUsuarioPorId = async (id) => {
  const response = await api.get(`/usuarios/${id}`)
  return response.data
}

//CREAR USUARIO (REGISTRO)
export const crearUsuario = async (datos) => {
  const response = await api.post("/usuarios", datos)
  return response.data
}

//ACTUALIZAR DATOS PERSONALES
export const actualizarUsuario = async (id, datos) => {
  const response = await api.put(`/usuarios/${id}`, datos)
  return response.data
}

//ACTUALIZAR USUARIO COMO ADMIN (ROL, ESTADO)
export const actualizarUsuarioAdmin = async (id, datos) => {
  const response = await api.put(`/admin/usuarios/${id}`, datos)
  return response.data
}

//ELIMINAR USUARIO
export const eliminarUsuario = async (id) => {
  await api.delete(`/usuarios/${id}`)
}

//GUARDAR EL AVATAR DEL USUARIO
export const guardarAvatar = async (id, avatar) => {
  const response = await api.put(`/usuarios/${id}`, { avatar })
  return response.data
}

//COMPROBAR SI UN EMAIL YA EXISTE
export const comprobarEmail = async (email) => {
  const response = await api.get(`/usuarios/existe-email`, { params: { email } })
  return response.data
}