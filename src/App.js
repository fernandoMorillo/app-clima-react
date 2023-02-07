import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';



function App() {
  const [busqueda, setGuardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [consultar, setGuardarConsulta] = useState(false);
  const [resultado, setGuardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '63ad8a819ca7a9e86d8ce3efe347cf37';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setGuardarResultado(resultado);
        setGuardarConsulta(false);

        // Detecta si hubo resultados correctos en la consulta

        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }

    }
    consultarApi();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima
      resultado={resultado}
    />
  }

  return (
    <Fragment>
      <Header
        titulo="App clima React"
      />

      <div className='contenedor-form'>
        <div className='container'>
          <div className='row'>
            <div className='col m6 s12'>
              <Formulario
                busqueda={busqueda}
                setGuardarBusqueda={setGuardarBusqueda}
                setGuardarConsulta={setGuardarConsulta}
              />
            </div>
            <div className='col m6 s12'>
              {componente}
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default App;
