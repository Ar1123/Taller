import { TajetaTarea } from "./tarejas.js";
import { Resources } from "./resources/peticion.js";

/**************************VARIABLES GLOBALES****************************************/
const btnAbrir = document.getElementById("abirformulario"),
        cajafor = document.getElementById("caja-formulario"),
        formulario = document.getElementById("formulario"),
        btnCerrar = document.getElementById("cerrar"),
        btnCrearActividad = document.getElementById("aniade-datos"),
        tarjetaTarea = new TajetaTarea(),
        resources = new Resources();
let tareas = []; //contiene los datos de todas las tareas que son creadas

/***********************PARA ABRIR EL  FORMULARIO**********************/
btnAbrir.addEventListener("click", () =>  cajafor.classList.add("abirformulario"));

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
      if (
        object.tituloTarea != "" &&
        object.fechaLimite != "" &&
        object.colaboradores != "" &&
        object.descripcion != ""
      ) {
        //console.log(object);

        tarjetaTarea.getContenidoMessage("Creando Tarea...");
        setTimeout(() => {
          resolve(object);
          cajafor.classList.remove("abirformulario");
          formulario.classList.remove("abirformulario");
          document.getElementById("form").reset();
        }, 2000);
      } else {
        reject(new Error("Los campos no ha recibido datos"));
      }
    });
  };


  functionPromise()
    .then((res) => {
      tareas.push(res);
      tarjetaTarea.agregarTarea(res);
      document.querySelector(".message").remove();
    })
    .catch((e) => {
      tarjetaTarea.getContenidoMessage("Por favor Llena todos los campos");
      console.error(e.message);
      setTimeout(() => {
        document.querySelector(".message").remove();
      }, 1500);
    });
  /*const functionAsync = async () => {
    try {
      const res = await functionPromise();
      tareas.push(res);
      //console.log(tareas);
      tarjetaTarea.agregarTarea(res);
    } catch (error) {
      tarjetaTarea.getContenidoMessage("Por favor Llena todos los campos");
      console.error(error.message);
    } finally {
      setTimeout(() => {
        document.querySelector(".message").remove();
      }, 1500);
    }
  };

  functionAsync();*/
});

/***************************************Mover Tarjeta a progreso**********************************/

document.getElementById("tareas-progreso").addEventListener("click", (e) => {
  if (e.target.id === "mover2") {
    const elementoPadre =
      e.target.parentElement.parentElement.parentElement.parentElement;
    const titulo = elementoPadre.getElementsByTagName("h4")[0].innerHTML;
    const datosTarea = tareas.find((d) => d.tituloTarea === titulo);
    //console.log(tareas);
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
    const datosTarea = tareas.find((d) => d.tituloTarea === titulo);
    tarjetaTarea.tareaProgreso(datosTarea);
    elementoPadre.remove();
  }

  e.preventDefault();
});
/************************Cargar  tarjetas predeterminadas******************************************/
  const cargar = async ()=>{
  try
    {
      let name = [];
      let i    = 0;
      const username = await resources.getUSerDataAA();
      const tareasL  = await resources.getDatosLocal();
      if(username.length!=0){
        username.forEach(elemento=>{
            name.push({name: elemento.name});
        });             
        tareasL.forEach(d => {
          d.colaboradores =name[i].name + " , " + name[tareasL.length - i].name;
          tareas.push(d);
          i++;
    });    
        for (let i = 0; i < tareasL.length; i++) {
          if (i < 1) {
            tarjetaTarea.agregarTarea(tareasL[i]);
          } else if (i > 1 && i < 4) {
            tarjetaTarea.tareaProgreso(tareasL[i]);
          } else {
            tarjetaTarea.tareaTerminada(tareasL[1]);
          }
          
        }
      }    
    }catch(e){
      console.error('ERROR: ',e);
    }    
  }

addEventListener('load',()=>cargar());

/********************************Borrar tarjeta***************************************************/

document.getElementById("tarea-creada").addEventListener("click", (e) => {
  if (e.target.id === "borrar") {
    const elementoPadre =
      e.target.parentElement.parentElement.parentElement.parentElement;
    elementoPadre.remove();
  }
  e.preventDefault();
});
