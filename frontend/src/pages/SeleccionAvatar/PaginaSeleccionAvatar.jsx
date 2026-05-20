import usePaginaSeleccionAvatar from "./usePaginaSeleccionAvatar"
import "./PaginaSeleccionAvatar.css"

function PaginaSeleccionAvatar() {

  //HOOK AVATARES
  const {
    usuario,
    categoria,
    setCategoria,
    avataresFiltrados,
    avatarSeleccionado,
    setAvatarSeleccionado,
    cargando,
    handleConfirmar
  } = usePaginaSeleccionAvatar()

  return (
    <div className="contenedor-avatar">
      <div className="tarjeta-avatar">

        <div className="cabecera-avatar">
          <h2>¡Bienvenido, {usuario?.nombre}!</h2>
          <p>Elige tu avatar para empezar</p>
        </div>

        <div className="filtros-avatar">
          <button
            className={`boton-filtro ${categoria === "todos" ? "activo" : ""}`}
            onClick={() => setCategoria("todos")}>
            Todos
          </button>
          <button
            className={`boton-filtro ${categoria === "masculino" ? "activo" : ""}`}
            onClick={() => setCategoria("masculino")}>
            Masculino
          </button>
          <button
            className={`boton-filtro ${categoria === "femenino" ? "activo" : ""}`}
            onClick={() => setCategoria("femenino")}>
            Femenino
          </button>
        </div>

        <div className="cuadricula-avatares">
          {avataresFiltrados.map((avatar) => (
            <div
              key={avatar.id}
              className={`tarjeta-avatar-opcion ${avatarSeleccionado?.id === avatar.id ? "seleccionado" : ""}`}
              onClick={() => setAvatarSeleccionado(avatar)}>
              <img src={avatar.imagen} alt={avatar.nombre} />
              <span>{avatar.nombre}</span>
            </div>
          ))}
        </div>

        <button
          className="boton-confirmar"
          onClick={handleConfirmar}
          disabled={!avatarSeleccionado || cargando}>
          {cargando
            ? "Guardando..."
            : avatarSeleccionado
              ? `Elegir a ${avatarSeleccionado.nombre}`
              : "Selecciona un avatar"}
        </button>

      </div>
    </div>
  )
}

export default PaginaSeleccionAvatar