import usePaginaNuevoEntrenamiento from "./usePaginaNuevoEntrenamiento"
import "./PaginaNuevoEntrenamiento.css"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"

function PaginaNuevoEntrenamiento() {

  const {
    nombre,
    setNombre,
    error,
    cargando,
    handleCrear
  } = usePaginaNuevoEntrenamiento()

  return (
    <div className="contenedor-nuevo-entrenamiento">

      <NavbarSuperior rutaVolver="/dashboard" />

      <form onSubmit={handleCrear} className="formulario-nuevo">

        {error && (
          <div className="error-nuevo">
            {error}
          </div>
        )}

        <div className="grupo-campo">
          <label htmlFor="nombre">Nombre del entrenamiento</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Pecho y tríceps"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
            required
          />
        </div>

        <button
          type="submit"
          className="boton-crear"
          disabled={cargando || !nombre.trim()}>
          {cargando ? "Creando..." : "Crear entrenamiento"}
        </button>

      </form>

      <NavbarInferior />

    </div>
  )
}

export default PaginaNuevoEntrenamiento