import useGestionEjercicios from "./useGestionEjercicios";
import "./GestionEjercicios.css";

function GestionEjercicios({ volverAlMenu }) {
  const {
    ejercicios,
    musculos,
    cargando,
    error,
    ejercicioABorrar,
    mostrandoForm,
    busqueda,
    setBusqueda,
    limite,
    setLimite,
    ejerciciosMostrados,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    videoUrl,
    setVideoUrl,
    dificultad,
    setDificultad,
    idMusculo,
    setIdMusculo,
    editando,
    nuevoEjercicio,
    editarEjercicio,
    volverALista,
    guardarEjercicio,
    cambiarEstado,
    pedirConfirmacion,
    cancelarBorrado,
    confirmarBorrado,
  } = useGestionEjercicios();

  return (
    <div className="vista-seccion">
      {/*CABECERA CON BOTON VOLVER*/}
      <div className="cabecera-vista">
        <button className="boton-volver-menu" onClick={volverAlMenu}>
          Volver al menú
        </button>
        <h2 className="titulo-seccion-admin">Gestión de ejercicios</h2>
      </div>

      {error && <div className="error-admin">{error}</div>}

      {/*===== VISTA FORMULARIO =====*/}
      {mostrandoForm ? (
        <form className="form-admin" onSubmit={guardarEjercicio}>
          <h3>{editando ? "Editar ejercicio" : "Nuevo ejercicio"}</h3>

          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Press banca"
          />

          <label>Músculo</label>
          <select
            value={idMusculo}
            onChange={(e) => setIdMusculo(e.target.value)}
          >
            <option value="">Selecciona un músculo</option>
            {musculos.map((m) => (
              <option key={m.idMusculo} value={m.idMusculo}>
                {m.nombre}
              </option>
            ))}
          </select>

          <label>Dificultad</label>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="PRINCIPIANTE">Principiante</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="AVANZADO">Avanzado</option>
          </select>

          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción opcional"
            rows="2"
          />

          <label>URL del vídeo</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Opcional"
          />

          <div className="form-botones">
            <button
              type="button"
              className="boton-cancelar-form"
              onClick={volverALista}
            >
              Volver a la lista
            </button>
            <button type="submit" className="boton-guardar-admin">
              {editando ? "Guardar cambios" : "Crear ejercicio"}
            </button>
          </div>
        </form>
      ) : (
        /*===== VISTA LISTA =====*/
        <>
          {/*BOTON NUEVO EJERCICIO*/}
          <button className="boton-nuevo" onClick={nuevoEjercicio}>
             Nuevo ejercicio
          </button>

          {/*BUSCADOR Y LIMITE*/}
          <div className="barra-filtros">
            <input
              type="text"
              className="input-buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar ejercicio..."
            />
            <select
              className="select-limite"
              value={limite}
              onChange={(e) => {
                const valor = e.target.value;
                setLimite(valor === "todos" ? "todos" : parseInt(valor));
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="todos">Todos</option>
            </select>
          </div>

          {cargando ? (
            <p className="texto-cargando-admin">Cargando ejercicios...</p>
          ) : (
            <div className="lista-admin">
              {ejerciciosMostrados().map((ej) => (
                <div key={ej.idEjercicio} className="item-admin">
                  <div className="item-info">
                    <span className="item-nombre">
                      {ej.nombre}
                      {!ej.activo && (
                        <span className="etiqueta-inactivo"> (inactivo)</span>
                      )}
                    </span>
                    <span className="item-desc">
                      {ej.nombreMusculo} · {ej.dificultad}
                    </span>
                  </div>

                  <div className="item-acciones">
                    <button
                      className={`boton-estado ${ej.activo ? "activo" : "inactivo"}`}
                      onClick={() => cambiarEstado(ej)}
                    >
                      {ej.activo ? "Activo" : "Inactivo"}
                    </button>
                    <button
                      className="boton-editar"
                      onClick={() => editarEjercicio(ej)}
                    >
                      Editar
                    </button>
                    <button
                      className="boton-eliminar"
                      onClick={() => pedirConfirmacion(ej)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/*MODAL DE CONFIRMACION DE BORRADO*/}
      {ejercicioABorrar && (
        <div className="overlay-modal" onClick={cancelarBorrado}>
          <div
            className="modal-confirmacion"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Eliminar ejercicio</h3>
            <p>
              ¿Seguro que quieres eliminar{" "}
              <strong>{ejercicioABorrar.nombre}</strong>? Esta acción no se
              puede deshacer.
            </p>
            <div className="modal-botones">
              <button className="boton-cancelar" onClick={cancelarBorrado}>
                Cancelar
              </button>
              <button className="boton-confirmar" onClick={confirmarBorrado}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionEjercicios;
