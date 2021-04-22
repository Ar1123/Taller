import { TajetaTarea } from "./tarejas.js";
import { Resources } from "./resources/peticion.js";
import  { Tarea} from "./actividad.js";



/**************************VARIABLES GLOBALES****************************************/
const btnAbrir = document.getElementById("abirformulario"),
  cajafor = document.getElementById("caja-formulario"),
  formulario = document.getElementById("formulario"),
  btnCerrar = document.getElementById("cerrar"),
  btnCrearActividad = document.getElementById("aniade-datos"),
  tarjetaTarea = new TajetaTarea(),
  resources = new Resources();
let data = []; //contiene los datos de todas las tareas que son creadas

/***********************PARA ABRIR EL  FORMULARIO**********************/
btnAbrir.addEventListener("click", () =>
  cajafor.classList.add("abirformulario")
);

/***********************PARA CERRAR EL  FORMULARIO**********************/
btnCerrar.addEventListener("click", (e) => {
  e.preventDefault();
  cajafor.classList.remove("abirformulario");
  formulario.classList.remove("abirformulario");
});

/*************************SOLICITUD DE DATOS Y CREACION TARJETA DE TAREA****************************/

btnCrearActividad.addEventListener("click", (e) => {
  e.preventDefault();
  const tituloTarea = document.getElementById("tituloTarea").value,
    fechaLimite = document.getElementById("fechaLimite").value,
    colaboradores = document.getElementById("colaboradores").value,
    descripcion = document.getElementById("descripcion").value;

  

  let object = {
    tituloTarea,
    fechaLimite,
    colaboradores,
    descripcion,
  };

  const functionPromise = () => {
    return new Promise((resolve, reject) => {
      if (object.tituloTarea != "" && object.fechaLimite !='' && object.colaboradores !='' &&  object.descripcion!='') {
        console.log(object);
        const tarea = new Tarea(object);
        tarjetaTarea.getContenidoMessage("Creando Tarea...");
        setTimeout(() => {
          console.log(tarea);
          resolve(tarea);
          cajafor.classList.remove("abirformulario");
          formulario.classList.remove("abirformulario");
          document.getElementById("form").reset();
        }, 2000);
      } else {
        tarjetaTarea.getContenidoMessage("Por favor Llena todos los campos");
        reject(new Error("Los campos no ha recibido datos"));
      }
    });
  };

  const functionAsync= async () => {
    try {
      const res = await functionPromise();
      data.push(res);      
      tarjetaTarea.agregarTarea(res);      
    } catch (error) {
      console.log(error);
    } finally {
      
      setTimeout(() => {
        document.querySelector(".message").remove();
      }, 1500);
    }
  };
  
  functionAsync();
});

/***************************************Mover Tarjeta a progreso**********************************/

document.getElementById("tareas-progreso").addEventListener("click", (e) => {
  if (e.target.id === "mover2") {
    const elementoPadre =
      e.target.parentElement.parentElement.parentElement.parentElement;
    const titulo = elementoPadre.getElementsByTagName("h4")[0].innerHTML;
    const datosTarea = data.find((d) => d.tituloTarea === titulo);
    data.splice(titulo);
    tarjetaTarea.tareaTerminada(datosTarea);
    elementoPadre.remove();
  }

  e.preventDefault();
});

/***************************************Mover Tarjeta a finalizado**********************************/
document.getElementById("tarea-creada").addEventListener("click", (e) => {
  if (e.target.id === "mover") {
    const elementoPadre =
      e.target.parentElement.parentElement.parentElement.parentElement;
    const titulo = elementoPadre.getElementsByTagName("h4")[0].innerHTML;
    const datosTarea = data.find((d) => d.tituloTarea === titulo);
    data.splice(titulo);
    tarjetaTarea.tareaProgreso(datosTarea);
    elementoPadre.remove();
  }

  e.preventDefault();
});
/******************************************************Cargar  tarjetas predeterminadas */


addEventListener("load", () => {
  resources.getUSerDataAA()
           .then(data=>console.log(data))
           .catch(e=>console.log('Error en la conexion',e));
  
});
