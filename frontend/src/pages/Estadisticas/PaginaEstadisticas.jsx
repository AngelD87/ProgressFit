import usePaginaEstadisticas from "./usePaginaEstadisticas"
import "./PaginaEstadisticas.css"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts"

function PaginaEstadisticas() {

  const {
    cargando,
    musculoSeleccionado,
    handleMusculoChange,
    listaMusculos,
    ejercicioSeleccionado,
    setEjercicioSeleccionado,
    listaEjerciciosPorMusculo,
    datosProgresion,
    datosFatiga,
    datosEntrenamientosSemana,
    datosValoracion
  } = usePaginaEstadisticas()

  if (cargando) {
    return (
      <div className="contenedor-estadisticas">
        <NavbarSuperior />
        <p className="texto-cargando">Cargando estadísticas...</p>
        <NavbarInferior />
      </div>
    )
  }

  return (
    <div className="contenedor-estadisticas">

      <NavbarSuperior />

      <main className="contenido-estadisticas">

        <h1 className="titulo-estadisticas">Rendimiento</h1>

        {/*GRAFICA PROGRESION DE PESO */}
        <div className="seccion-grafica">
          <h2>Progresión de peso</h2>
          <p className="descripcion-grafica">Peso máximo levantado por sesión en un ejercicio</p>

          {/*SELECCIONAR MUSCULO*/}
          <select
            className="selector-ejercicio"
            value={musculoSeleccionado}
            onChange={e => handleMusculoChange(e.target.value)}
          >
            <option value="">Selecciona un músculo</option>
            {listaMusculos().map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>

          {/*LUEGO EL EJERCICIO DE ESE MUSCULO*/}
          {musculoSeleccionado && (
            <select
              className="selector-ejercicio"
              value={ejercicioSeleccionado}
              onChange={e => setEjercicioSeleccionado(e.target.value)}
            >
              <option value="">Selecciona un ejercicio</option>
              {listaEjerciciosPorMusculo().map(ej => (
                <option key={ej.id} value={ej.id}>{ej.nombre}</option>
              ))}
            </select>
          )}

          {ejercicioSeleccionado && datosProgresion().length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={datosProgresion()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="fecha" tick={{ fill: "#aaa", fontSize: 11 }} />
                <YAxis tick={{ fill: "#aaa", fontSize: 11 }} unit="kg" width={42} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #444", color: "white" }}
                  formatter={(value) => [`${value}kg`, "Peso máximo"]}
                />
                <Line
                  type="monotone"
                  dataKey="pesoMax"
                  stroke="#4f7fff"
                  strokeWidth={2}
                  dot={{ fill: "#4f7fff", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : ejercicioSeleccionado ? (
            <p className="sin-datos">No hay datos suficientes para este ejercicio</p>
          ) : null}
        </div>

        {/*GRAFICA FATIGA*/}
        <div className="seccion-grafica">
          <h2>Fatiga percibida</h2>
          <p className="descripcion-grafica">Cómo de cansado te has sentido en cada entrenamiento</p>

          {datosFatiga().length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={datosFatiga()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="fecha" tick={{ fill: "#aaa", fontSize: 11 }} />
                <YAxis domain={[1, 10]} tick={{ fill: "#aaa", fontSize: 11 }} width={30} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #444", color: "white" }}
                  formatter={(value) => [value, "Fatiga"]}
                />
                <Line
                  type="monotone"
                  dataKey="fatiga"
                  stroke="#ff7777"
                  strokeWidth={2}
                  dot={{ fill: "#ff7777", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="sin-datos">Aún no tienes datos de fatiga</p>
          )}
        </div>

        {/*GRAFICA FRECUENCIA SEMANAL */}
        <div className="seccion-grafica">
          <h2>Frecuencia semanal</h2>
          <p className="descripcion-grafica">Número de entrenamientos por semana</p>

          {datosEntrenamientosSemana().length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={datosEntrenamientosSemana()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="semana" tick={{ fill: "#aaa", fontSize: 11 }} />
                <YAxis tick={{ fill: "#aaa", fontSize: 11 }} allowDecimals={false} width={30} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #444", color: "white" }}
                  formatter={(value) => [value, "Entrenamientos"]}
                />
                <Bar dataKey="entrenamientos" fill="#3153b7" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="sin-datos">Aún no tienes datos suficientes</p>
          )}
        </div>

        {/*GRAFICA VALORACION*/}
        <div className="seccion-grafica">
          <h2>Valoración de entrenamientos</h2>
          <p className="descripcion-grafica">Cómo has valorado cada entrenamiento</p>

          {datosValoracion().length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={datosValoracion()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="fecha" tick={{ fill: "#aaa", fontSize: 11 }} />
                <YAxis domain={[1, 5]} tick={{ fill: "#aaa", fontSize: 11 }} width={30} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #444", color: "white" }}
                  formatter={(value) => [`${value} ⭐`, "Valoración"]}
                />
                <Line
                  type="monotone"
                  dataKey="valoracion"
                  stroke="#f5c518"
                  strokeWidth={2}
                  dot={{ fill: "#f5c518", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="sin-datos">Aún no tienes valoraciones</p>
          )}
        </div>

      </main>

      <NavbarInferior />

    </div>
  )
}

export default PaginaEstadisticas