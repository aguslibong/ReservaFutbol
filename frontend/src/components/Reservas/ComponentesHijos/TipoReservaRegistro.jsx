import React, { useState, useEffect } from 'react';
import tipoReservasService from '../../../services/reservas/tipoReservas.service';
import { useForm } from 'react-hook-form';

export default function TipoReservaRegistro({ setAction, loadData, tipoReserva }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (tipoReserva) {
            setValue('idTipoReserva', tipoReserva.idTipoReserva);
            setValue('descripcion', tipoReserva.descripcion);
        }
    }, [tipoReserva, setValue]);

    const onSubmit = async (data) => {
        if (tipoReserva) {
            const updatedTipoReserva = { ...tipoReserva, ...data };
            await tipoReservasService.updateTipoReservas(updatedTipoReserva);
        } else {
            await tipoReservasService.saveTipoReservas(data);
        }
        loadData();
        setAction('C');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>{tipoReserva ? 'Actualizar Tipo de Reserva' : 'Registrar Tipo de Reserva'}</h5>
                {tipoReserva && (
                    <div className="form-group">
                        <label htmlFor="idTipoReserva">Id Tipo de Reserva:</label>
                        <input type="text" className="form-control" id="idTipoReserva" value={tipoReserva.idTipoReserva} disabled />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" className="form-control" id="descripcion" {...register("descripcion", {
                        required: {
                            value: true,
                            message: 'Este campo es requerido'
                        }
                    })} />
                    {errors.descripcion && <span className='error'><span className='error-icon'></span>{errors.descripcion.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setAction('C')}>Cancelar</button>    
            </form>
        </div>
    );
}