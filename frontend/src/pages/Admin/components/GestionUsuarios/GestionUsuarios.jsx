import useGestionUsuarios from "./useGestionUsuarios"
import "./GestionUsuarios.css"

function GestionUsuarios({ volverAlMenu }) {

  const {
    usuario,
    cargando,
    error,
    busqueda, setBusqueda,
    limite, setLimite,
    usuariosMostrados,
    cambiarRol,
    cambiarEstado
  } = useGestionUsuarios()

  return (
    <div className="vista-seccion">

      <div className="cabecera-vista">
        <button className="boton-volver-menu" onClick={volverAlMenu}>
           Volver al menú
        </button>
        <h2 className="titulo-seccion-admin">Gestión de usuarios</h2>
      </div>

      {error && <div className="error-admin">{error}</div>}

      {cargando ? (
        <p className="texto-cargando-admin">Cargando usuarios...</p>
      ) : (
        <>
          {/*BUSCADOR Y LIMITE*/}
          <div className="barra-filtros">
            <input
              type="text"
              className="input-buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o email..."
            />
            <select
              className="select-limite"
              value={limite}
              onChange={(e) => {
                const valor = e.target.value
                setLimite(valor === "todos" ? "todos" : parseInt(valor))
              }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="todos">Todos</option>
            </select>
          </div>

          <div className="tabla-usuarios">

            {/*CABECERA DE LA TABLA*/}
            <div className="fila-cabecera">
              <span className="col-nombre">Usuario</span>
              <span className="col-rol">Rol</span>
              <span className="col-estado">Estado</span>
            </div>

            {/*FILAS DE USUARIOS*/}
            {usuariosMostrados().map(u => (
              <div key={u.idUsuario} className="fila-usuario">

                {/*NOMBRE Y EMAIL*/}
                <div className="col-nombre">
                  <span className="nombre-usuario">{u.nombre}</span>
                  <span className="email-usuario">{u.email}</span>
                </div>

                {/*SELECTOR DE ROL*/}
                <div className="col-rol">
                  <select
                    value={u.rol}
                    onChange={(e) => cambiarRol(u.idUsuario, e.target.value)}
                    className="select-rol"
                    disabled={u.idUsuario === usuario.idUsuario}>
                    <option value="USUARIO">Usuario</option>
                    <option value="ENTRENADOR">Entrenador</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                {/*BOTON DE ESTADO*/}
                <div className="col-estado">
                  <button
                    className={`boton-estado ${u.isActive ? "activo" : "inactivo"}`}
                    onClick={() => cambiarEstado(u.idUsuario, !u.isActive)}
                    disabled={u.idUsuario === usuario.idUsuario}>
                    {u.isActive ? "Activo" : "Inactivo"}
                  </button>
                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </div>
  )
}

export default GestionUsuarios