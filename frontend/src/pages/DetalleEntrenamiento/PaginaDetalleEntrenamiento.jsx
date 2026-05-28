import { useState } from "react"
import usePaginaDetalleEntrenamiento from "./usePaginaDetalleEntrenamiento"
import "./PaginaDetalleEntrenamiento.css"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"

function PaginaDetalleEntrenamiento() {

  const {
    entrenamiento,
    cargando,
    musculos,
    musculoSeleccionado,
    ejerciciosMusculo,
    mostrarSelectorEjercicio,
    setMostrarSelectorEjercicio,
    handleSeleccionarMusculo,
    handleAñadirEjercicio,
    handleEliminarEjercicio,
    handleMoverArriba,
    handleMoverAbajo,
    handleAñadirSerie,
    handleEliminarSerie,
    handleEliminar,
    mostrarModalValoracion,
    setMostrarModalValoracion,
    valoracion,
    setValoracion,
    fatigaPercibida,
    setFatigaPercibida,
    comentario,
    setComentario,
    errorModal,
    errorPagina,
    handleAbrirValoracion,
    handleFinalizarSinValorar,
    handleFinalizarConValoracion,
    handleGuardarValoracion
  } = usePaginaDetalleEntrenamiento()

  const [serieForm, setSerieForm] = useState({})

  const handleCambioSerie = (idEntrenamientoEjercicio, campo, valor) => {
    setSerieForm(prev => ({
      ...prev,
      [idEntrenamientoEjercicio]: {
        ...prev[idEntrenamientoEjercicio],
        [campo]: valor
      }
    }))
  }

  const handleSubmitSerie = async (idEntrenamientoEjercicio) => {
    const form = serieForm[idEntrenamientoEjercicio] || {}
    if (!form.peso || !form.repeticiones) return
    await handleAñadirSerie(
      idEntrenamientoEjercicio,
      form.peso,
      form.repeticiones,
      form.rir || null
    )
    setSerieForm(prev => ({
      ...prev,
      [idEntrenamientoEjercicio]: { peso: "", repeticiones: "", rir: "" }
    }))
  }

  if (cargando) {
    return (
      <div className="contenedor-detalle">
        <NavbarSuperior rutaVolver="/dashboard" />
        <p className="texto-cargando">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="contenedor-detalle">

      <NavbarSuperior rutaVolver="/dashboard" />

      <main className="contenido-detalle">

        {/*CABECERA DEL ENTRENAMIENTO*/}
        <div className="cabecera-entrenamiento">
          <div>
            <h1>{entrenamiento?.nombre}</h1>
            <span className="fecha-entrenamiento">
              {entrenamiento?.inicio && new Date(entrenamiento.inicio).toLocaleDateString("es-ES")}
            </span>
          </div>
          {!entrenamiento?.fin && (
            <span className="badge-activo">ABIERTO</span>
          )}
          {entrenamiento?.fin && (
            <span className="badge-completado">COMPLETADO</span>
          )}
        </div>

        {/*SELECTOR DE MUSCULOS*/}
        {!entrenamiento?.fin && (
          <div className="seccion-añadir">
            {!mostrarSelectorEjercicio ? (
              <>
                <p className="label-seccion">Selecciona un músculo</p>
                <div className="lista-musculos">
                  {musculos.map(musculo => (
                    <button
                      key={musculo.idMusculo}
                      className="chip-musculo"
                      onClick={() => handleSeleccionarMusculo(musculo)}>
                      {musculo.nombre}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="cabecera-selector">
                  <p className="label-seccion">
                    Ejercicios de {musculoSeleccionado?.nombre}
                  </p>
                  <button
                    className="boton-cancelar"
                    onClick={() => setMostrarSelectorEjercicio(false)}>
                    Cancelar
                  </button>
                </div>
                <div className="lista-ejercicios-selector">
                  {ejerciciosMusculo.map(ejercicio => (
                    <button
                      key={ejercicio.idEjercicio}
                      className="item-ejercicio-selector"
                      onClick={() => handleAñadirEjercicio(ejercicio)}>
                      <span>{ejercicio.nombre}</span>
                      <span className="badge-dificultad">{ejercicio.dificultad}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/*LISTA EJERCICIOS*/}
        <div className="lista-ejercicios">
          {entrenamiento?.ejercicios?.length === 0 && (
            <p className="sin-ejercicios">
              Añade tu primer ejercicio seleccionando un músculo
            </p>
          )}

          {entrenamiento?.ejercicios?.map((ejercicio, index) => (
            <div key={ejercicio.idEntrenamientoEjercicio} className="tarjeta-ejercicio">

              <div className="cabecera-ejercicio">
                <div className="ejercicio-info">
                  <span className="ejercicio-nombre">{ejercicio.nombreEjercicio}</span>
                </div>
                <div className="ejercicio-acciones">
                  {!entrenamiento?.fin && (
                    <>
                      <div className="botones-orden">
                        <button
                          className="boton-orden"
                          onClick={() => handleMoverArriba(index)}
                          disabled={index === 0}>
                          ▲
                        </button>
                        <button
                          className="boton-orden"
                          onClick={() => handleMoverAbajo(index)}
                          disabled={index === entrenamiento.ejercicios.length - 1}>
                          ▼
                        </button>
                      </div>
                      <button
                        className="boton-eliminar-ejercicio"
                        onClick={() => handleEliminarEjercicio(ejercicio.idEntrenamientoEjercicio)}>
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="lista-series">
                <div className="cabecera-series">
                  <span>Serie</span>
                  <span>Kg</span>
                  <span>Reps</span>
                  <span>RIR</span>
                  {!entrenamiento?.fin && <span></span>}
                </div>

                {ejercicio.series?.map(serie => (
                  <div key={serie.idSerie} className="fila-serie">
                    <span className="numero-serie">S{serie.numeroSerie}</span>
                    <span>{serie.peso}kg</span>
                    <span>{serie.repeticiones}</span>
                    <span>{serie.rir ?? "-"}</span>
                    {!entrenamiento?.fin && (
                      <button
                        className="boton-eliminar-serie"
                        onClick={() => handleEliminarSerie(serie.idSerie)}>
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {!entrenamiento?.fin && (
                <div className="formulario-serie">
                  <input
                    type="number"
                    placeholder="Kg"
                    value={serieForm[ejercicio.idEntrenamientoEjercicio]?.peso || ""}
                    onChange={e => handleCambioSerie(ejercicio.idEntrenamientoEjercicio, "peso", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={serieForm[ejercicio.idEntrenamientoEjercicio]?.repeticiones || ""}
                    onChange={e => handleCambioSerie(ejercicio.idEntrenamientoEjercicio, "repeticiones", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="RIR"
                    value={serieForm[ejercicio.idEntrenamientoEjercicio]?.rir || ""}
                    onChange={e => handleCambioSerie(ejercicio.idEntrenamientoEjercicio, "rir", e.target.value)}
                  />
                  <button
                    className="boton-añadir-serie"
                    onClick={() => handleSubmitSerie(ejercicio.idEntrenamientoEjercicio)}>
                    + Serie
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>

        {errorPagina && (
  <div className="error-pagina">
    {errorPagina}
  </div>
)}

        {/*BOTONES FINALES - ENTRENAMIENTO ABIERTO*/}
        {!entrenamiento?.fin && (
          <div className="botones-finales">
            <button className="boton-finalizar" onClick={handleAbrirValoracion}>
              Finalizar entrenamiento
            </button>
            <button className="boton-finalizar-sin-valorar" onClick={handleFinalizarSinValorar}>
              Guardar sin valorar
            </button>
            <button className="boton-eliminar" onClick={handleEliminar}>
              Eliminar entrenamiento
            </button>
          </div>
        )}

        {/*BOTON VALORAR - ENTRENAMIENTO CERRADO*/}
        {entrenamiento?.fin && (
          <div className="botones-finales">
            <button className="boton-valorar" onClick={handleAbrirValoracion}>
              {entrenamiento?.valoracion ? "Editar valoración" : "+ Añadir valoración"}
            </button>
          </div>
        )}

        {/*VALORACION ACTUAL SI EXISTE*/}
        {entrenamiento?.fin && entrenamiento?.valoracion && (
          <div className="seccion-valoracion">
            <p className="label-seccion">Valoración</p>
            <div className="valoracion-estrellas">
              {[1, 2, 3, 4, 5].map(n => (
                <span key={n} className={n <= entrenamiento.valoracion ? "estrella-llena" : "estrella-vacia"}>
                  ★
                </span>
              ))}
            </div>
            {entrenamiento?.fatigaPercibida && (
              <p className="valoracion-dato">
                Fatiga: <span>{entrenamiento.fatigaPercibida}/10</span>
              </p>
            )}
            {entrenamiento?.comentario && (
              <p className="valoracion-comentario">{entrenamiento.comentario}</p>
            )}
          </div>
        )}

      </main>

      {/*MODAL DE VALORACION*/}
      {mostrarModalValoracion && (
        <div className="modal-overlay" onClick={() => setMostrarModalValoracion(false)}>
          <div className="modal-valoracion" onClick={e => e.stopPropagation()}>

            <h2>¿Cómo fue el entrenamiento?</h2>

            <div className="modal-campo">
              <label>Valoración</label>
              <div className="selector-estrellas">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    className={`estrella-btn ${n <= valoracion ? "activa" : ""}`}
                    onClick={() => setValoracion(n)}>
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-campo">
              <label>Fatiga percibida: <span className="fatiga-valor">{fatigaPercibida}/10</span></label>
              <input
                type="range"
                min="1"
                max="10"
                value={fatigaPercibida}
                onChange={e => setFatigaPercibida(parseInt(e.target.value))}
                className="slider-fatiga"
              />
              <div className="slider-labels">
                <span>Fresco</span>
                <span>Agotado</span>
              </div>
            </div>

            <div className="modal-campo">
              <label>Comentario (opcional)</label>
              <textarea
                placeholder="¿Cómo te has sentido?"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                className="textarea-comentario"
                rows={3}
              />
            </div>

            {errorModal && (
              <div className="error-modal">
                {errorModal}
              </div>
            )}

            <div className="modal-botones">
              {!entrenamiento?.fin ? (
                <>
                  <button className="modal-btn-confirmar" onClick={handleFinalizarConValoracion}>
                    Finalizar y guardar
                  </button>
                  <button className="modal-btn-cancelar" onClick={() => setMostrarModalValoracion(false)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button className="modal-btn-confirmar" onClick={handleGuardarValoracion}>
                    Guardar valoración
                  </button>
                  <button className="modal-btn-cancelar" onClick={() => setMostrarModalValoracion(false)}>
                    Cancelar
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      <NavbarInferior />

    </div>
  )
}

export default PaginaDetalleEntrenamiento