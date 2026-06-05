import { useState } from "react"
import usePaginaPerfil from "./usePaginaPerfil"
import "./PaginaPerfil.css"
import listaAvatares from "../../assets/avatares/listaAvatares"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"

function PaginaPerfil() {

  const {
    usuario,
    nombre, setNombre,
    altura, setAltura,
    fechaNacimiento, setFechaNacimiento,
    sexo, setSexo,
    password, setPassword,
    peso, setPeso,
    pesoObjetivo, setPesoObjetivo,
    nivelActividad, setNivelActividad,
    errorDatos, okDatos,
    errorPeso, okPeso,
    errorObjetivo, okObjetivo,
    cargandoDatos, cargandoPeso, cargandoObjetivo,
    handleGuardarDatos,
    handleGuardarPeso,
    handleGuardarObjetivo,
    navigate
  } = usePaginaPerfil()

  //PESTAÑA ACTIVA (datos, peso u objetivo)
  const [pestaña, setPestaña] = useState("datos")

  const avatarUsuario = listaAvatares.find(a => a.id === usuario?.avatar)

  return (
    <div className="contenedor-perfil">

      <NavbarSuperior rutaVolver="/dashboard" />

      <main className="contenido-perfil">

        {/*CABECERA CON AVATAR*/}
        <div className="cabecera-perfil">
          {avatarUsuario && (
            <img src={avatarUsuario.imagen} alt="avatar" className="perfil-avatar" />
          )}
          <div>
            <h1>{usuario?.nombre}</h1>
            <p className="perfil-email">{usuario?.email}</p>
          </div>
        </div>

        <button
          className="boton-cambiar-avatar"
          onClick={() => navigate("/seleccionar-avatar")}>
          Cambiar avatar
        </button>

        {/*PESTAÑAS*/}
        <div className="pestañas-perfil">
          <button
            className={`pestaña ${pestaña === "datos" ? "activa" : ""}`}
            onClick={() => setPestaña("datos")}>
            Datos
          </button>
          <button
            className={`pestaña ${pestaña === "peso" ? "activa" : ""}`}
            onClick={() => setPestaña("peso")}>
            Peso
          </button>
          <button
            className={`pestaña ${pestaña === "objetivo" ? "activa" : ""}`}
            onClick={() => setPestaña("objetivo")}>
            Objetivo
          </button>
        </div>

        {/*SECCION DATOS PERSONALES*/}
        {pestaña === "datos" && (
          <form className="seccion-perfil" onSubmit={handleGuardarDatos}>
            <h2>Datos personales</h2>

            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />

            <label>Altura (m)</label>
            <input
              type="number"
              step="0.01"
              value={altura}
              onChange={e => setAltura(e.target.value)}
              placeholder="Ej: 1.75"
            />

            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={e => setFechaNacimiento(e.target.value)}
            />

            <label>Sexo</label>
            <select
              value={sexo}
              onChange={e => setSexo(e.target.value)}
              className="select-perfil">
              <option value="">Selecciona</option>
              <option value="HOMBRE">Hombre</option>
              <option value="MUJER">Mujer</option>
            </select>

            <label>Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Déjalo vacío para no cambiarla"
            />

            {errorDatos && <div className="mensaje-error">{errorDatos}</div>}
            {okDatos && <div className="mensaje-ok">{okDatos}</div>}

            <button type="submit" className="boton-guardar" disabled={cargandoDatos}>
              {cargandoDatos ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        )}

        {/*SECCION PESO*/}
        {pestaña === "peso" && (
          <form className="seccion-perfil" onSubmit={handleGuardarPeso}>
            <h2>Peso corporal</h2>
            <p className="descripcion-peso">
              Actualiza tu peso para llevar un registro de tu evolución
            </p>

            <label>Peso actual (kg)</label>
            <input
              type="number"
              step="0.1"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              placeholder="Ej: 75.5"
            />

            {errorPeso && <div className="mensaje-error">{errorPeso}</div>}
            {okPeso && <div className="mensaje-ok">{okPeso}</div>}

            <button type="submit" className="boton-guardar" disabled={cargandoPeso}>
              {cargandoPeso ? "Guardando..." : "Actualizar peso"}
            </button>
          </form>
        )}

        {/*SECCION OBJETIVO*/}
        {pestaña === "objetivo" && (
          <form className="seccion-perfil" onSubmit={handleGuardarObjetivo}>
            <h2>Mi objetivo</h2>
            <p className="descripcion-peso">
              Define tu meta para calcular tus calorías recomendadas
            </p>

            <label>Peso objetivo (kg)</label>
            <input
              type="number"
              step="0.1"
              value={pesoObjetivo}
              onChange={e => setPesoObjetivo(e.target.value)}
              placeholder="Ej: 80"
            />

            <label>Nivel de actividad</label>
            <select
              value={nivelActividad}
              onChange={e => setNivelActividad(e.target.value)}
              className="select-perfil">
              <option value="">Selecciona</option>
              <option value="SEDENTARIO">Sedentario (poco o nada de ejercicio)</option>
              <option value="LIGERO">Ligero (1-3 días/semana)</option>
              <option value="MODERADO">Moderado (3-5 días/semana)</option>
              <option value="ACTIVO">Activo (6-7 días/semana)</option>
              <option value="MUY_ACTIVO">Muy activo (2 entrenos/día)</option>
            </select>

            {errorObjetivo && <div className="mensaje-error">{errorObjetivo}</div>}
            {okObjetivo && <div className="mensaje-ok">{okObjetivo}</div>}

            <button type="submit" className="boton-guardar" disabled={cargandoObjetivo}>
              {cargandoObjetivo ? "Guardando..." : "Guardar objetivo"}
            </button>
          </form>
        )}

      </main>

      <NavbarInferior />

    </div>
  )
}

export default PaginaPerfil