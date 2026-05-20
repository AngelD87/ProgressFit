import usePaginaDashboard from "./usePaginaDashboard"
import "./PaginaDashboard.css"
import listaAvatares from "../../assets/avatares/listaAvatares"
import logo from "../../assets/logo.png"
import iconoInicio from "../../assets/iconos-navegacion/icono-inicio.png"
import iconoStats from "../../assets/iconos-navegacion/icono-stats.png"
import iconoPerfil from "../../assets/iconos-navegacion/icono-perfil.png"

function PaginaDashboard() {

  const {
    usuario,
    entrenamientos,
    cargando,
    handleLogout,
    navigate,
    totalEntrenamientos
  } = usePaginaDashboard()

  const avatarUsuario = listaAvatares.find(a => a.id === usuario?.avatar)

  return (
    <div className="contenedor-dashboard">

      <nav className="barra-navegacion">
        <img src={logo} alt="ProgressFit" className="nav-logo" />
        <button className="boton-logout" onClick={handleLogout}>
          Salir
        </button>
      </nav>

      <main className="contenido-dashboard">

        <div className="seccion-bienvenida">
          {avatarUsuario && (
            <img src={avatarUsuario.imagen} alt="avatar" className="bienvenida-avatar" />
          )}
          <div className="bienvenida-texto">
            <h1>{usuario?.nombre}</h1>
            <p>Transforma tu cuerpo, supera tus limites</p>
          </div>
        </div>

        <div className="tarjetas-estadisticas">
          <div className="tarjeta-estadistica">
            <span className="estadistica-numero">
              {usuario?.pesoCorporal ? `${usuario.pesoCorporal}kg` : "-"}
            </span>
            <span className="estadistica-label">Peso corporal</span>
          </div>
          <div className="tarjeta-estadistica">
            <span className="estadistica-numero">
              {usuario?.altura ? `${usuario.altura}m` : "-"}
            </span>
            <span className="estadistica-label">Altura</span>
          </div>
          <div className="tarjeta-estadistica">
            <span className="estadistica-numero">{totalEntrenamientos}</span>
            <span className="estadistica-label">Entrenamientos</span>
          </div>
        </div>

        
        <button
          className="boton-nuevo-entrenamiento"
          onClick={() => navigate("/entrenamientos/nuevo")}>
          + Nuevo entrenamiento
        </button>

        
        <div className="seccion-entrenamientos">
          <h2>Mis entrenamientos</h2>

          {cargando ? (
            <p className="texto-cargando">Cargando...</p>
          ) : entrenamientos.length === 0 ? (
            <div className="sin-entrenamientos">
              <p>Aún no tienes entrenamientos</p>
              <p>¡Empieza tu primer entrenamiento!</p>
            </div>
          ) : (
            <div className="lista-entrenamientos">
              {[...entrenamientos].reverse().map((entrenamiento) => (
                <div
                  key={entrenamiento.idEntrenamiento}
                  className="tarjeta-entrenamiento"
                  onClick={() => navigate(`/entrenamientos/${entrenamiento.idEntrenamiento}`)}>
                  <div className="entrenamiento-info">
                    <span className="entrenamiento-nombre">{entrenamiento.nombre}</span>
                    <span className="entrenamiento-fecha">
                      {new Date(entrenamiento.inicio).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  {entrenamiento.fin ? (
                    <span className="estado-completado">Completado</span>
                  ) : (
                    <span className="estado-activo">En curso</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <nav className="navbar-inferior">
        <button
          className="nav-inferior-item activo"
          onClick={() => navigate("/dashboard")}>
          <img src={iconoInicio} alt="Inicio" className="icono-nav" />
          Inicio
        </button>
        <button
          className="nav-inferior-item"
          onClick={() => navigate("/estadisticas")}>
          <img src={iconoStats} alt="Stats" className="icono-nav" />
          Rendimiento
        </button>
        <button
          className="nav-inferior-item"
          onClick={() => navigate("/perfil")}>
          <img src={iconoPerfil} alt="Perfil" className="icono-nav" />
          Perfil
        </button>
      </nav>

    </div>
  )
}

export default PaginaDashboard