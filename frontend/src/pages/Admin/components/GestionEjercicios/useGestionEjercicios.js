import { useState, useEffect } from "react";
import {
  obtenerEjercicios,
  crearEjercicio,
  actualizarEjercicio,
  eliminarEjercicio,
} from "../../../../services/ejercicioServicio";
import { obtenerMusculos } from "../../../../services/musculoServicio";

function useGestionEjercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [musculos, setMusculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  //CONTROLA SI SE MUESTRA EL FORMULARIO O LA LISTA
  const [mostrandoForm, setMostrandoForm] = useState(false);

  //EJERCICIO PENDIENTE DE BORRAR 
  const [ejercicioABorrar, setEjercicioABorrar] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [limite, setLimite] = useState(10);

  //FORMULARIO
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [dificultad, setDificultad] = useState("PRINCIPIANTE");
  const [idMusculo, setIdMusculo] = useState("");
  const [editando, setEditando] = useState(null);

  //CARGAMOS EJERCICIOS Y MUSCULOS AL ENTRAR
  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [datosEj, datosMus] = await Promise.all([
        obtenerEjercicios(),
        obtenerMusculos(),
      ]);
      setEjercicios(datosEj);
      setMusculos(datosMus);
    } catch (err) {
      console.error("Error al cargar ejercicios", err);
      setError("No se pudieron cargar los ejercicios");
    } finally {
      setCargando(false);
    }
  };

  //FILTRA POR NOMBRE Y CORTA AL LIMITE
  const ejerciciosMostrados = () => {
    const texto = busqueda.toLowerCase();
    const filtrados = ejercicios.filter((ej) =>
      ej.nombre.toLowerCase().includes(texto),
    );
    //SI EL LIMITE ES "TODOS" DEVOLVEMOS TODOS LOS FILTRADOS
    if (limite === "todos") {
      return filtrados;
    }
    return filtrados.slice(0, limite);
  };

  //ABRE EL FORMULARIO VACIO PARA CREAR
  const nuevoEjercicio = () => {
    limpiarCampos();
    setError("");
    setMostrandoForm(true);
  };

  //RELLENA EL FORMULARIO Y LO ABRE PARA EDITAR
  const editarEjercicio = (ej) => {
    setEditando(ej.idEjercicio);
    setNombre(ej.nombre);
    setDescripcion(ej.descripcion || "");
    setVideoUrl(ej.videoUrl || "");
    setDificultad(ej.dificultad || "PRINCIPIANTE");
    setIdMusculo(ej.idMusculo);
    setError("");
    setMostrandoForm(true);
  };

  //VACIA LOS CAMPOS DEL FORMULARIO
  const limpiarCampos = () => {
    setEditando(null);
    setNombre("");
    setDescripcion("");
    setVideoUrl("");
    setDificultad("PRINCIPIANTE");
    setIdMusculo("");
  };

  //VUELVE A LA LISTA SIN GUARDAR
  const volverALista = () => {
    limpiarCampos();
    setError("");
    setMostrandoForm(false);
  };

  //GUARDA EL EJERCICIO (CREA O EDITA)
  const guardarEjercicio = async (e) => {
    e.preventDefault();
    setError("");

    //VALIDAMOS NOMBRE Y MUSCULO
    if (!nombre.trim()) {
      setError("El nombre del ejercicio es obligatorio");
      return;
    }
    if (!idMusculo) {
      setError("Debes seleccionar un músculo");
      return;
    }

    const datos = {
      nombre,
      descripcion,
      videoUrl,
      dificultad,
      idMusculo: parseInt(idMusculo),
    };

    try {
      if (editando) {
        const actualizado = await actualizarEjercicio(editando, datos);
        setEjercicios(
          ejercicios.map((ej) =>
            ej.idEjercicio === editando ? actualizado : ej,
          ),
        );
      } else {
        const nuevo = await crearEjercicio(datos);
        setEjercicios([...ejercicios, nuevo]);
      }
      //VOLVEMOS A LA LISTA TRAS GUARDAR
      limpiarCampos();
      setMostrandoForm(false);
    } catch (err) {
      console.error("Error al guardar el ejercicio", err);
      setError(
        err.response?.data?.message || "No se pudo guardar el ejercicio",
      );
    }
  };

  //ACTIVAR / DESACTIVAR UN EJERCICIO
  const cambiarEstado = async (ejercicio) => {
    setError("");
    try {
      const actualizado = await actualizarEjercicio(ejercicio.idEjercicio, {
        activo: !ejercicio.activo,
      });
      setEjercicios(
        ejercicios.map((ej) =>
          ej.idEjercicio === ejercicio.idEjercicio ? actualizado : ej,
        ),
      );
    } catch (err) {
      console.error("Error al cambiar el estado", err);
      setError("No se pudo cambiar el estado del ejercicio");
    }
  };

  //ABRIR MODAL DE BORRADO
  const pedirConfirmacion = (ejercicio) => {
    setEjercicioABorrar(ejercicio);
  };

  //CERRAR MODAL SIN BORRAR
  const cancelarBorrado = () => {
    setEjercicioABorrar(null);
  };

  //CONFIRMAR Y BORRAR
  const confirmarBorrado = async () => {
    if (!ejercicioABorrar) return;
    setError("");
    try {
      await eliminarEjercicio(ejercicioABorrar.idEjercicio);
      setEjercicios(
        ejercicios.filter(
          (ej) => ej.idEjercicio !== ejercicioABorrar.idEjercicio,
        ),
      );
      setEjercicioABorrar(null);
    } catch (err) {
      console.error("Error al eliminar el ejercicio", err);
      setError(
        "No se puede eliminar porque está siendo usado en entrenamientos. Puedes desactivarlo en su lugar.",
      );
      setEjercicioABorrar(null);
    }
  };

  return {
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
  };
}

export default useGestionEjercicios;
