export class TajetaTarea {
  agregarTarea(tarea) {
    console.log(tarea);
    const tarjeta = document.getElementById("tarea-creada");
    const elemento = document.createElement("div");
    elemento.innerHTML = `
    <div class="tarea-creada">
    <div class="header-tarea">
        <h4 id="title">${tarea.tituloTarea}</h4>
        <ul>
            <li>
                <i class="fas fa-people-carry" style="color: gray;" id="mover"></i>
            </li>
            <li id="borrar">
                <i class="fas fa-trash-alt" style="color: red;"></i>
            </li>
        </ul>
    </div>
    <div class="body-tarea">
        <p>${tarea.descripcion}</p>
    </div>
    <div class="footer-tarea">
        <footer>
            <div class="responsables">
                <label>Responsables hasta ${tarea.fechaLimite}</label><br>
                <label>${tarea.colaboradores}</label>                
            </div>
        </footer>
    </div>
</div>
    `;
    tarjeta.appendChild(elemento);
  }

  tareaProgreso(tarea) {
    const tarjeta = document.getElementById("tareas-progreso");
    const elemento = document.createElement("div");
    elemento.innerHTML = `
    <div class="tarea-creada">
    <div class="header-tarea">
        <h4 id="title">${tarea.tituloTarea}</h4>
        <ul>
            <li>
                <i class="fas fa-people-carry" style="color: blue;" id="mover2"></i>
            </li>            
        </ul>
    </div>
    <div class="body-tarea">
        <p>${tarea.descripcion}</p>
    </div>
    <div class="footer-tarea">
        <footer>
        <div class="responsables">
        <label>Responsables hasta ${tarea.fechaLimite}</label><br>
        <label>${tarea.colaboradores}</label>                
    </div>
        </footer>
    </div>
</div>
    `;
    tarjeta.appendChild(elemento);  
  }

  tareaTerminada(tarea) {
    const tarjeta = document.getElementById("tareas-finalizada");
    const elemento = document.createElement("div");
    elemento.innerHTML = `
    <div class="tarea-creada">
    <div class="header-tarea">
        <h4 id="title">${tarea.tituloTarea}</h4>
        <ul>
            <li>
                <i class="far fa-check-circle" style="color: green;" id="mover"></i>                
            </li>            
        </ul>
    </div>
    <div class="body-tarea">
        <p>${tarea.descripcion}</p>
    </div>
    <div class="footer-tarea">
        <footer>
        <div class="responsables">
        <label>Responsables hasta ${tarea.fechaLimite}</label><br>
        <label>${tarea.colaboradores}</label>                
    </div>
        </footer>
    </div>
</div>
    `;
    tarjeta.appendChild(elemento);  
  }

  getContenidoMessage(message) {
    const tarjeta = document.getElementById("message");
    const elemento = document.createElement("div");
    elemento.innerHTML = `<div class="message">
     <label>${message}</label>
 </div>
     `;
    tarjeta.appendChild(elemento);
  }
}
