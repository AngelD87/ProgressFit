import usePaginaDashboard from "./usePaginaDashboard"
import "./PaginaDashboard.css"
import listaAvatares from "../../assets/avatares/listaAvatares"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"

function PaginaDashboard() {

  const {
    usuario,
    entrenamientos,
    cargando,
    navigate,
    totalEntrenamientos
  } = usePaginaDashboard()

  const avatarUsuario = listaAvatares.find(a => a.id === usuario?.avatar)

  return (
    <div className="contenedor-dashboard">

      <NavbarSuperior />

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
          Nuevo entrenamiento
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
                    <span className="estado-completado">COMPLETADO</span>
                  ) : (
                    <span className="estado-activo">ABIERTO</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <NavbarInferior />

    </div>
  )
}

export default PaginaDashboard