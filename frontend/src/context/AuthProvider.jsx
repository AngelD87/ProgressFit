import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {

  //USUARIO GUARDADO
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  //TOKEN GUARDADO
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  //LOGIN
  const login = (datosUsuario, tokenJwt) => {
    setUsuario(datosUsuario)
    setToken(tokenJwt)
    localStorage.setItem('usuario', JSON.stringify(datosUsuario))
    localStorage.setItem('token', tokenJwt)
  }

  //LOGOUT
  const logout = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }

  //SABER SI ESTA LOGUEADO
  const estaLogueado = () => usuario !== null

  //SABER SI ES ADMIN
  const esAdmin = () => usuario?.rol === 'ADMIN'

  return (
    <AuthContext.Provider value={{
      usuario,
      token,
      login,
      logout,
      estaLogueado,
      esAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}