import usePaginaRegistro from "./usePaginaRegistro"
import "./PaginaRegistro.css"
import logo from "../../assets/logo.png"

function PaginaRegistro() {

  //HOOK DEL REGISTRO
  const {
    nombre, setNombre,
    email, setEmail,
    password, setPassword,
    pesoCorporal, setPesoCorporal,
    altura, setAltura,
    fechaNacimiento, setFechaNacimiento,
    sexo, setSexo,
    error,
    cargando,
    paso,
    siguientePaso,
    pasoAnterior,
    handleSubmit,
    navigate
  } = usePaginaRegistro()

  return (
    <div className="contenedor-registro">
      <div className="tarjeta-registro">

        <div className="cabecera-registro">
          <img src={logo} alt="ProgressFit" className="logo-registro" />
          <p>Crea tu cuenta gratis</p>
        </div>

        {/*INDICADOR DE PASOS*/}
        <div className="indicador-pasos">
          <span className={`punto-paso ${paso >= 1 ? "activo" : ""}`}></span>
          <span className={`punto-paso ${paso >= 2 ? "activo" : ""}`}></span>
          <span className={`punto-paso ${paso >= 3 ? "activo" : ""}`}></span>
        </div>

        {error && (
          <div className="error-registro">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="formulario-registro">

          {/*PASO 1 - CUENTA*/}
          {paso === 1 && (
            <>
              <div className="grupo-campo">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

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
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

          <button
            type="button"
            className="boton-registro"
            onClick={siguientePaso}
            disabled={cargando}>
            {cargando ? "Comprobando..." : "Siguiente"}
          </button>
            </>
          )}

          {/*PASO 2 - SOBRE TI*/}
          {paso === 2 && (
            <>
              <div className="grupo-campo">
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input
                  id="fechaNacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>

              <div className="grupo-campo">
                <label htmlFor="sexo">Sexo</label>
                <select
                  id="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  className="select-registro">
                  <option value="">Selecciona</option>
                  <option value="HOMBRE">Hombre</option>
                  <option value="MUJER">Mujer</option>
                </select>
              </div>

              <div className="fila-botones">
                <button
                  type="button"
                  className="boton-secundario"
                  onClick={pasoAnterior}>
                  Volver
                </button>
                <button
                  type="button"
                  className="boton-registro"
                  onClick={siguientePaso}>
                  Siguiente
                </button>
              </div>
            </>
          )}

          {/*PASO 3 - MEDIDAS*/}
          {paso === 3 && (
            <>
              <div className="grupo-campo">
                <label htmlFor="peso">Peso (kg)</label>
                <input
                  id="peso"
                  type="number"
                  placeholder="70"
                  step="0.1"
                  min="30"
                  max="300"
                  value={pesoCorporal}
                  onChange={(e) => setPesoCorporal(e.target.value)}
                />
              </div>

              <div className="grupo-campo">
                <label htmlFor="altura">Altura (m)</label>
                <input
                  id="altura"
                  type="number"
                  placeholder="1.75"
                  step="0.01"
                  min="1"
                  max="3"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </div>

              <div className="fila-botones">
                <button
                  type="button"
                  className="boton-secundario"
                  onClick={pasoAnterior}>
                  Volver
                </button>
                <button
                  type="submit"
                  className="boton-registro"
                  disabled={cargando}>
                  {cargando ? "Creando..." : "Crear cuenta"}
                </button>
              </div>
            </>
          )}

        </form>

        <p className="texto-login">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>

      </div>
    </div>
  )
}

export default PaginaRegistro