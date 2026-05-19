import { useContext } from 'react'
import { AuthContext } from './AuthContext'

//ATAJO PARA USAR EL CONTEXTO EN CUALQUIER COMPONENTE
export function useAuth() {
  return useContext(AuthContext)
}