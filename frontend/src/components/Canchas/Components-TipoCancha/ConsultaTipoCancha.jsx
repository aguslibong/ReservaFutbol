import React from 'react';
import { useState } from 'react';
import { Link }  from 'react-router-dom';

const ConsultaTipoCancha = ({ rows, onRegistrar, onModificar, onDelete, buscarId }) => {

    console.log(rows)
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        // Verifica que el valor solo contenga dígitos
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };


    const onClickDelete = async (cancha) => {
        onDelete(cancha.idTipoCancha)
    }

    const onClickUpdate = async (cancha) => {
        onModificar(cancha)
    }

    const onClickBuscar = async () => {
        buscarId(inputValue)
    }

const tbody = (rows[0] !== null) ? (
        rows.map(e =>
            <tr key={e.idTipoCancha}>
                <td>{e.idTipoCancha}</td>
                <td>{e.descripcion}</td>
                <td>
                    <button type="button" className="btn btn-secondary me-3" onClick={() => onClickUpdate(e)}>Modificar</button>
                    <button type="button" className="btn btn-danger me-3" onClick={() => onClickDelete(e)}>Eliminar</button>
                </td>
            </tr>
        )
    ) : (
        <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>ID no encontrada</td>
        </tr>
    );
    return (
        <div className="container mt-5">
            <div className="p-3 mb-2 bg-primary text-white rounded">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>GESTION TIPOCANCHA</h2>
            </div>
            <div>
                <label htmlFor="buscarId">Buscar Por ID: </label>
                <input
                    type="text"
                    id="buscarId"
                    value={inputValue}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
                <button onClick={onClickBuscar}>Buscar</button>
            </div>
            <table className="table table-bordered">
                <thead className="bg-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
            <button className="btn btn-secondary mt-3" onClick={onRegistrar}>Registrar TipoCancha</button> 
            <div>
                <Link to="/inicio" className="btn btn-primary m-3">Menu</Link>
                <Link to="/cancha" className="btn btn-primary m-3">Gestionar Cancha</Link>
            </div>
        </div>
        
    );
};

export default ConsultaTipoCancha;