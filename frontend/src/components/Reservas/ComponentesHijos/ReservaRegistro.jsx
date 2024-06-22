// ReservaRegistro.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import reservasService from "../../../services/reservas/reservas.service.js";
import canchasService from "../../../services/Canchas/canchas.service.js";
import clientesService from "../../../services/clientes/clientes.services.js";
import tipoReservasService from "../../../services/reservas/tipoReservas.service.js";

export default function ReservaRegistro({ setAction, loadData, reserva, canchas, clientes, tipoReservas }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (reserva) {
      setValue('idReserva', reserva.idReserva);
      setValue('fechaReserva', reserva.fechaReserva);
      setValue('hora', reserva.hora);
      setValue('idCancha', reserva.idCancha);
      setValue('idTipoReserva', reserva.idTipoReserva);
      setValue('idCliente', reserva.idCliente);
      setValue('comprobante', reserva.comprobante);
    }
  }, [reserva, setValue]);

  const onSubmit = async (data) => {
    if (reserva) {
      const updatedReserva = { ...reserva, ...data };
      await reservasService.updateReservas(updatedReserva);
    } else {
      await reservasService.saveReservas(data);
    }
    loadData();
    setAction('C');
  };

  return (
    <div className='container_app'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>{reserva ? 'Actualizar Reserva' : 'Registrar Reserva'}</h5>
        {reserva && (
          <div className="form-group">
            <label htmlFor="idReserva">Id Reserva:</label>
            <input type="text" className="form-control" id="idReserva" value={reserva.idReserva} disabled />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="fechaReserva">Fecha de Reserva:</label>
          <input type="date" className="form-control" id="fechaReserva" {...register("fechaReserva", {
            required: {
              value: true,
              message: 'Este campo es requerido'
            },
            validate: (value) => {
              const fechaReserva = new Date(value);
              const fechaActual = new Date();
              return fechaReserva >= fechaActual || 'La fecha de reserva debe ser mayor o igual a la fecha actual';
            }
          })} />
          {errors.fechaReserva && <span className='error'><span className='error-icon'></span>{errors.fechaReserva.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="idCancha">Cancha:</label>
          <select className="form-control" id="idCancha" {...register("idCancha", { required: "Este campo es requerido" })}>
            <option value="">Seleccione una Cancha</option>
            {canchas.map(cancha => (
              <option key={cancha.idCancha} value={cancha.idCancha}>{cancha.descripcion}</option>
            ))}
          </select>
          {errors.idCancha && <span className='error'><span className='error-icon'></span>{errors.idCancha.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="idTipoReserva">Tipo de Reserva:</label>
          <select className="form-control" id="idTipoReserva" {...register("idTipoReserva", { required: "Este campo es requerido" })}>
            <option value="">Seleccione un Tipo de Reserva</option>
            {tipoReservas.map(tipoReserva => (
              <option key={tipoReserva.idTipoReserva} value={tipoReserva.idTipoReserva}>{tipoReserva.descripcion}</option>
            ))}
          </select>
          {errors.idTipoReserva && <span className='error'><span className='error-icon'></span>{errors.idTipoReserva.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="idCliente">Cliente:</label>
          <select className="form-control" id="idCliente" {...register("idCliente", { required: "Este campo es requerido" })}>
            <option value="">Seleccione un Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombre}</option>
            ))}
          </select>
          {errors.idCliente && <span className='error'><span className='error-icon'></span>{errors.idCliente.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="comprobante">Comprobante:</label>
          <input type="text" className="form-control" id="comprobante" {...register("comprobante", { required: "Este campo es requerido" })} />
          {errors.comprobante && <span className='error'><span className='error-icon'></span>{errors.comprobante.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="hora">Hora:</label>
          <input type="time" className="form-control" id="hora" {...register("hora", { required: "Este campo es requerido" })} />
          {errors.hora && <span className='error'><span className='error-icon'></span>{errors.hora.message}</span>}
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-3 me-2">{reserva ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className="btn btn-danger mt-3" onClick={() => setAction('C')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
