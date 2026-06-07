import useGestionMusculos from "./useGestionMusculos"
import "./GestionMusculos.css"

function GestionMusculos({ volverAlMenu }) {

  const {
    musculos,
    cargando,
    error,
    nombre, setNombre,
    descripcion, setDescripcion,
    editando,
    editarMusculo,
    limpiarForm,
    guardarMusculo
  } = useGestionMusculos()

  return (
    <div className="vista-seccion">

      <div className="cabecera-vista">
        <button className="boton-volver-menu" onClick={volverAlMenu}>
           Volver al menú
        </button>
        <h2 className="titulo-seccion-admin">Gestión de músculos</h2>
      </div>

      {error && <div className="error-admin">{error}</div>}

      <form className="form-admin" onSubmit={guardarMusculo}>
        <h3>{editando ? "Editar músculo" : "Nuevo músculo"}</h3>

        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Pectoral"
        />

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción opcional"
          rows="2"
        />

        <div className="form-botones">
          {editando && (
            <button type="button" className="boton-cancelar-form" onClick={limpiarForm}>
              Cancelar
            </button>
          )}
          <button type="submit" className="boton-guardar-admin">
            {editando ? "Guardar cambios" : "Crear músculo"}
          </button>
        </div>
      </form>

      {cargando ? (
        <p className="texto-cargando-admin">Cargando músculos...</p>
      ) : (
        <div className="lista-admin">
          {musculos.map(m => (
            <div key={m.idMusculo} className="item-admin">
              <div className="item-info">
                <span className="item-nombre">{m.nombre}</span>
                {m.descripcion && <span className="item-desc">{m.descripcion}</span>}
              </div>
              <div className="item-acciones">
                <button className="boton-editar" onClick={() => editarMusculo(m)}>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default GestionMusculos