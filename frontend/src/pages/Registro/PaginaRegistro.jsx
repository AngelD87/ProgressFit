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
    error,
    cargando,
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

        {error && (
          <div className="error-registro">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="formulario-registro">

          <div className="grupo-campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
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
              required
            />
          </div>

          <div className="grupo-campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="fila-dos-campos">
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
          </div>

          <button
            type="submit"
            className="boton-registro"
            disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>

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