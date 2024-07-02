import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import reservasService from "../../../services/reservas/reservas.service.js";

export default function ReservaRegistro({ setAction, loadData, reserva, canchas, clientes, tipoReservas }) {
  const [canchaAct ,setCanchaAct] = useState ([])

  useEffect(() => {
    const activos = [];
    const inactivos = [];
    canchas.forEach(element => {
      element.activo ? activos.push(element) : inactivos.push(element);
    });
    console.log(activos)
    setCanchaAct(activos)
    }, []);


  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      ...reserva,
      activo: reserva ? reserva.activo : true,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    if (reserva) {
      await reservasService.updateReservas({ ...reserva, ...data });
    } else {
      await reservasService.saveReservas(data);
    }
    loadData();
    setAction('C');
  };

  const onCancel = () => {
    setAction('C');
  };

  return (
    <div className="container_app">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="fechaReserva">Fecha Reserva</label>
        <input type="date" {...register("fechaReserva", { required: "La fecha de reserva es obligatoria" })} className="form-control" />
        {errors.fechaReserva && <Alert variant="danger">{errors.fechaReserva.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="hora">Hora</label>
        <input type="time" {...register("hora", { required: "La hora es obligatoria" })} className="form-control" />
        {errors.hora && <Alert variant="danger">{errors.hora.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="idCancha">Cancha</label>
        <select {...register("idCancha", { required: "La cancha es obligatoria" })} className="form-control">
          {canchas.map((canchaAct) => (
            <option key={canchaAct.idCancha} value={canchaAct.idCancha}>
              {canchaAct.descripcion}
            </option>
          ))}
        </select>
        {errors.idCancha && <Alert variant="danger">{errors.idCancha.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="idCliente">Cliente</label>
        <select {...register("idCliente", { required: "El cliente es obligatorio" })} className="form-control">
          {clientes.map((cliente) => (
            <option key={cliente.idCliente} value={cliente.idCliente}>
              {cliente.nroDoc}
            </option>
          ))}
        </select>
        {errors.idCliente && <Alert variant="danger">{errors.idCliente.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="idTipoReserva">Tipo Reserva</label>
        <select {...register("idTipoReserva", { required: "El tipo de reserva es obligatorio" })} className="form-control">
          {tipoReservas.map((tipoReserva) => (
            <option key={tipoReserva.idTipoReserva} value={tipoReserva.idTipoReserva}>
              {tipoReserva.descripcion}
            </option>
          ))}
        </select>
        {errors.idTipoReserva && <Alert variant="danger">{errors.idTipoReserva.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="comprobante">Observación</label>
        <input type="text" {...register("comprobante", { required: "La observación es obligatoria" })} className="form-control" />
        {errors.comprobante && <Alert variant="danger">{errors.comprobante.message}</Alert>}
      </div>
      <div className="form-group">
        <label htmlFor="activo">Activo</label>
        <input type="checkbox" {...register("activo")} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
    </div>
  );
}
