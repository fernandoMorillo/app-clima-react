import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';
const Formulario = ({ busqueda, setGuardarBusqueda, setGuardarConsulta }) => {



    const [error, setGuardarError] = useState(false);

    const { ciudad, pais } = busqueda;


    //tomar valores del form y guardarlos en el state
    const tomarValoresInputs = e => {
        setGuardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    };

    // Enviar datos o guardar datos
    const guardarDatos = e => {
        e.preventDefault();

        //validar formulario
        if (ciudad.trim() === '' || pais.trim() === '') {
            setGuardarError(true);
            return;
        } else {
            setGuardarError(false);
            setGuardarConsulta(true);
        }


    };

    return (
        <form
            onSubmit={guardarDatos}
        >
            {error ? <Error
                mensaje="Todos los campos son obligatorios"
            /> : null}

            <div className='input-field col s12'>
                <input
                    type="text"
                    name='ciudad'
                    id='ciudad'
                    value={ciudad}
                    onChange={tomarValoresInputs}
                />
                <label htmlFor='ciudad'>Ciudad: </label>
            </div>

            <div className='input-field col s12'>
                <select
                    name='pais'
                    id='pais'
                    value={pais}
                    onChange={tomarValoresInputs}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor='pais'>País: </label>
            </div>

            <div className='input-field col s12'>
                <input
                    style={{ width: "100%" }}
                    type="submit"
                    value="Buscar clima"
                    className='waves-effect waves-light btn-large btn-block yellow accent-4'
                />
            </div>
        </form>
    );
}
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setGuardarBusqueda: PropTypes.func.isRequired,
    setGuardarConsulta: PropTypes.func.isRequired
}
export default Formulario;