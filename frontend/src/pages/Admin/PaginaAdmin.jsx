import usePaginaAdmin from "./usePaginaAdmin";
import "./PaginaAdmin.css";
import logo from "../../assets/logo.png";
import GestionUsuarios from "./components/GestionUsuarios/GestionUsuarios";
import GestionMusculos from "./components/GestionMusculos/GestionMusculos";
import GestionEjercicios from "./components/GestionEjercicios/GestionEjercicios";

function PaginaAdmin() {
  const { vista, irA, volverAlMenu, cerrarSesion } = usePaginaAdmin();

  return (
    <div className="contenedor-admin">

      <header className="cabecera-admin">
        <img src={logo} alt="ProgressFit" className="logo-admin" />
        <button className="boton-cerrar-sesion" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <main className="contenido-admin">
        {vista === "menu" && (
          <div className="menu-admin">
            <div className="tarjetas-menu">
              <button className="tarjeta-menu" onClick={() => irA("usuarios")}>
                <span className="tarjeta-titulo">Usuarios</span>
                <span className="tarjeta-desc">Gestionar cuentas y roles</span>
              </button>

              <button className="tarjeta-menu" onClick={() => irA("musculos")}>
                <span className="tarjeta-titulo">Músculos</span>
                <span className="tarjeta-desc">Crear y editar músculos</span>
              </button>

              <button
                className="tarjeta-menu"
                onClick={() => irA("ejercicios")}
              >
                <span className="tarjeta-titulo">Ejercicios</span>
                <span className="tarjeta-desc">Crear y editar ejercicios</span>
              </button>
            </div>
          </div>
        )}

        {vista === "usuarios" && (
          <GestionUsuarios volverAlMenu={volverAlMenu} />
        )}
        {vista === "musculos" && (
          <GestionMusculos volverAlMenu={volverAlMenu} />
        )}
        {vista === "ejercicios" && (
          <GestionEjercicios volverAlMenu={volverAlMenu} />
        )}
      </main>
    </div>
  );
}

export default PaginaAdmin;
