import usePaginaLogin from './usePaginaLogin'
import './PaginaLogin.css'
import logo from '../../assets/logo.png'


function PaginaLogin() {

  //TRAEMOS TODA LA LOGICA DEL HOOK
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    cargando,
    handleSubmit,
    navigate
  } = usePaginaLogin()

  return (
    <div className="contenedor-login">
      <div className="tarjeta-login">

        <div className="cabecera-login">
          <img src={logo} alt="ProgressFit" className="logo-login" />
          <p>Transforma tu cuerpo, supera tus limites</p>
        </div>

        {error && (
          <div className="error-login">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="formulario-login">

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

          <button
            type="submit"
            className="boton-login"
            disabled={cargando}>
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>

        </form>

        <p className="texto-registro">
          ¿No tienes cuenta?{' '}
          <span onClick={() => navigate('/registro')}>
            Regístrate
          </span>
        </p>

      </div>
    </div>
  )
}

export default PaginaLogin