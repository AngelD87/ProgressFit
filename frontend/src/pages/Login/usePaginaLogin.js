import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { login } from '../../services/authServicio'

function usePaginaLogin() {

  //ESTADOS DEL FORMULARIO
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  //HOOKS DE NAVEGACION Y CONTEXTO
  const navigate = useNavigate()
  const { login: guardarSesion } = useAuth()

  //FUNCION QUE SE EJECUTA AL ENVIAR EL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      //LLAMADA AL BACKEND
      const datos = await login(email, password)

      //GUARDAMOS LA SESION EN EL CONTEXTO
      guardarSesion(datos, datos.token)

      //REDIRIGIMOS SEGUN EL ROL
      if (datos.rol === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }

    } catch {
    setError('Email o contraseña incorrectos')
    } finally {
      setCargando(false)
    }
  }

  //DEVOLVEMOS TODO LO QUE NECESITA EL HTML
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    cargando,
    handleSubmit,
    navigate
  }
}

export default usePaginaLogin