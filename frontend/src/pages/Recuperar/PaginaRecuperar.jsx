import usePaginaRecuperar from "./usePaginaRecuperar"
import "./PaginaRecuperar.css"
import logo from "../../assets/logo.png"

function PaginaRecuperar() {

  const {
    paso,
    email, setEmail,
    fechaNacimiento, setFechaNacimiento,
    nuevaPassword, setNuevaPassword,
    repetirPassword, setRepetirPassword,
    error,
    cargando,
    verificar,
    cambiarPassword,
    navigate
  } = usePaginaRecuperar()

  return (
    <div className="contenedor-login">
      <div className="tarjeta-login">

        <div className="cabecera-login">
          <img src={logo} alt="ProgressFit" className="logo-login" />
          <p>Recupera el acceso a tu cuenta</p>
        </div>

        {/*INDICADOR DE PASOS*/}
        <div className="indicador-pasos">
          <span className={`punto-paso ${paso >= 1 ? "activo" : ""}`}></span>
          <span className={`punto-paso ${paso >= 2 ? "activo" : ""}`}></span>
        </div>

        {error && (
          <div className="error-login">
            {error}
          </div>
        )}

        {/*PASO 1 - VERIFICAR IDENTIDAD*/}
        {paso === 1 && (
          <form onSubmit={verificar} className="formulario-login">

            <div className="grupo-campo">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grupo-campo">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input
                id="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="boton-login"
              disabled={cargando}>
              {cargando ? "Verificando..." : "Verificar"}
            </button>

          </form>
        )}

        {/*PASO 2 - NUEVA CONTRASEÑA*/}
        {paso === 2 && (
          <form onSubmit={cambiarPassword} className="formulario-login">

            <div className="grupo-campo">
              <label htmlFor="nuevaPassword">Nueva contraseña</label>
              <input
                id="nuevaPassword"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
              />
            </div>

            <div className="grupo-campo">
              <label htmlFor="repetirPassword">Repetir contraseña</label>
              <input
                id="repetirPassword"
                type="password"
                placeholder="Repite la contraseña"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="boton-login"
              disabled={cargando}>
              {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>

          </form>
        )}

        <p className="texto-registro">
          <span onClick={() => navigate("/login")}>
            Volver al inicio de sesión
          </span>
        </p>

      </div>
    </div>
  )
}

export default PaginaRecuperar