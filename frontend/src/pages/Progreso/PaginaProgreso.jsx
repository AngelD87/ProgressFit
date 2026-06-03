import usePaginaProgreso from "./usePaginaProgreso"
import "./PaginaProgreso.css"
import NavbarSuperior from "../../components/NavbarSuperior/NavbarSuperior"
import NavbarInferior from "../../components/NavbarInferior/NavbarInferior"
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"

function PaginaProgreso() {

  const {
    usuario,
    historial,
    cargando,
    periodo,
    setPeriodo,
    calcularImc,
    categoriaImc,
    colorImc,
    pesoMinimo,
    pesoMaximo,
    variacionTotal,
    datosGrafica
  } = usePaginaProgreso()

  if (cargando) {
    return (
      <div className="contenedor-progreso">
        <NavbarSuperior />
        <p className="texto-cargando">Cargando...</p>
        <NavbarInferior />
      </div>
    )
  }

  const imc = calcularImc()
  const varTotal = variacionTotal()

  //DEVUELVE EL TEXTO CON SIGNO (+ O -) DELANTE
  const conSigno = (valor) => {
    if (valor > 0) return `+${valor}kg`
    return `${valor}kg`
  }

  return (
    <div className="contenedor-progreso">

      <NavbarSuperior />

      <main className="contenido-progreso">

        <h1 className="titulo-progreso">Progreso</h1>

        {/*TARJETA IMC*/}
        <div className="seccion-progreso">
          <h2>Índice de Masa Corporal (IMC)</h2>

          {imc != null ? (
            <div className="imc-contenido">
              <span className="imc-numero" style={{ color: colorImc(imc) }}>
                {imc}
              </span>
              <span className="imc-categoria" style={{ color: colorImc(imc) }}>
                {categoriaImc(imc)}
              </span>
              <p className="imc-info">
                Calculado con tu peso actual ({usuario.pesoCorporal}kg) y altura ({usuario.altura}m)
              </p>
            </div>
          ) : (
            <p className="sin-datos">
              Completa tu peso y altura en el perfil para ver tu IMC
            </p>
          )}
        </div>

        {/*GRAFICA EVOLUCION DE PESO*/}
        <div className="seccion-progreso">
          <h2>Evolución del peso</h2>

          {/*BOTONES DE PERIODO*/}
          <div className="botones-periodo">
            <button
              className={`boton-periodo ${periodo === 1 ? "activo" : ""}`}
              onClick={() => setPeriodo(1)}>
              1 mes
            </button>
            <button
              className={`boton-periodo ${periodo === 3 ? "activo" : ""}`}
              onClick={() => setPeriodo(3)}>
              3 meses
            </button>
            <button
              className={`boton-periodo ${periodo === 6 ? "activo" : ""}`}
              onClick={() => setPeriodo(6)}>
              6 meses
            </button>
            <button
              className={`boton-periodo ${periodo === 0 ? "activo" : ""}`}
              onClick={() => setPeriodo(0)}>
              Todo
            </button>
          </div>

          {datosGrafica().length > 1 ? (
            <ResponsiveContainer width="100%" height={240} minWidth={0}>
              <LineChart data={datosGrafica()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="fecha" tick={{ fill: "#aaa", fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "#aaa", fontSize: 11 }} unit="kg" width={45} domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #444", color: "white" }}
                  formatter={(value) => [`${value}kg`, "Peso"]}
                />
                <Line
                  type="monotone"
                  dataKey="peso"
                  stroke="#4f7fff"
                  strokeWidth={2}
                  dot={{ fill: "#4f7fff", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="sin-datos">
              No hay suficientes registros en este periodo para ver la evolución
            </p>
          )}
        </div>

        {/*VARIACION DE PESO*/}
        {varTotal != null && (
          <div className="seccion-progreso">
            <h2>Variación de peso</h2>

            <div className="tarjeta-variacion">
              <span className="variacion-numero" style={{ color: varTotal <= 0 ? "#4caf50" : "#ff7777" }}>
                {conSigno(varTotal)}
              </span>
              <span className="variacion-label">Desde tu primer registro</span>
            </div>
          </div>
        )}

        {/*RESUMEN MIN / MAX*/}
        {historial.length > 0 && (
          <div className="seccion-progreso">
            <h2>Resumen</h2>

            <div className="fila-resumen">
              <div className="tarjeta-resumen">
                <span className="resumen-numero">{pesoMinimo()}kg</span>
                <span className="resumen-label">Mínimo</span>
              </div>
              <div className="tarjeta-resumen">
                <span className="resumen-numero">{pesoMaximo()}kg</span>
                <span className="resumen-label">Máximo</span>
              </div>
            </div>
          </div>
        )}

        {/*SIN REGISTROS*/}
        {historial.length === 0 && (
          <div className="seccion-progreso">
            <p className="sin-datos">
              Aún no tienes registros de peso. Actualiza tu peso en el perfil para empezar a ver tu progreso.
            </p>
          </div>
        )}

      </main>

      <NavbarInferior />

    </div>
  )
}

export default PaginaProgreso