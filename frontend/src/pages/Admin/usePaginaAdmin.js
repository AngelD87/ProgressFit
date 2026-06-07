import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

function usePaginaAdmin() {

  const { logout } = useAuth()
  const navigate = useNavigate()

  //MENU, USUARIOS, MUSCULOS, EJERCICIOS
  const [vista, setVista] = useState("menu")

  //IR A UNA GESTION
  const irA = (nuevaVista) => {
    setVista(nuevaVista)
  }

  const volverAlMenu = () => {
    setVista("menu")
  }

  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  return {
    vista,
    irA,
    volverAlMenu,
    cerrarSesion
  }
}

export default usePaginaAdmin