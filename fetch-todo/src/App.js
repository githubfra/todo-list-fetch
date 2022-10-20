import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from "react";

function App() {

  const [actividad, setActividad] = useState("");
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    getTareas()
  }, [])


  const getTareas = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/frand',
      {
        method: "GET",

      })
      .then(resp => {
        console.log(resp, "respuesta");
        return resp.json();
      })
      .then(data => { setActividades(data); })
      .catch(error => {
        console.log(error);
      });
  }

  const putTareas = (actividad) => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/frand',
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actividad)

      })
      .then(resp => {
        console.log(resp, "respuesta");
        return resp.json();
      })
      .then(data => { console.log(data); })
      .catch(error => {
        console.log(error);
      });
  }


  /* Guardar */
  const nuevaActividad = (event) => {
    setActividad(event.target.value);

  }

  /* Borrar */

  const borrarActividad = (indice) => {
    setActividades(actividades.filter((actividad, index) => index !== indice))
    /* Se aplica put para borrar(aun no lo hago) */

  }
  const guardarActividad = (event) => {
    event.preventDefault();
    let nuevaAct = { label: actividad, done: false }
    setActividades(actividades.concat(nuevaAct))
    setActividad("")
    /* Se aplica el metodo PUT del Fetch para guardar la tarea */
    let newTasks = actividades.concat(nuevaAct)
    putTareas(newTasks)
  }

  return (
    <div className="container-fluid d-flex m-4 justify-content-center" id="m4">
      <div className="row align-items-center">
        <div className='row'>

          <h2 className='mb-2'>TODOLIST: </h2>
          <form onSubmit={guardarActividad}>

            <input
              type="text"
              placeholder="Add task..."
              className="form-control mb-4 border-info bg-success p-2 text-dark bg-opacity-25"
              value={actividad.label}
              onChange={nuevaActividad} /* EVENTO PARA CAPTURAR LO QUE SE ESCRIBE EN EL IMPUT EN NUESTRO ESTADO DEL NUEVO ITEM*/
            />
          </form>

          <div className='row mt-5'>
            <div className='col-md-12'>
              {actividades.length > 0 ?
                actividades.map((actividad, indice) => (
                  <div className='card'
                    key={actividad.label}
                    style={{ cursor: "pointer" }}
                    onClick={() => borrarActividad(indice)}
                  >
                    <div className='card-body'> {actividad.label}
                    </div>
                  </div>
                )) : "NO HAY TAREAS PENDIENTES!"}

            </div>
          </div>



        </div>
      </div>
    </div >

  );
}

export default App;