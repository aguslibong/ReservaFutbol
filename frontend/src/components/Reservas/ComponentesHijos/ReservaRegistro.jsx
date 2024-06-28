import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Slider from "react-slick";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import reservasService from "../../../services/reservas/reservas.service.js";
import canchasService from "../../../services/Canchas/canchas.service.js";
import clientesService from "../../../services/clientes/clientes.services.js";
import tipoReservasService from "../../../services/reservas/tipoReservas.service.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReservaRegistro({ setAction, loadData, reserva, canchas, clientes, tipoReservas }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (reserva) {
      console.log('Setting form values with reserva:', reserva);
      setValue("idReserva", reserva.idReserva);
      setValue("fechaReserva", reserva.fechaReserva);
      setValue("hora", reserva.hora);
      setValue("idCancha", reserva.idCancha);
      setValue("idTipoReserva", reserva.idTipoReserva);
      setValue("idCliente", reserva.idCliente);
      setValue("comprobante", reserva.comprobante);
    }
  }, [reserva, setValue]);

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    if (reserva) {
      const updatedReserva = { ...reserva, ...data };
      await reservasService.updateReservas(updatedReserva);
    } else {
      await reservasService.saveReservas(data);
    }
    loadData();
    setAction('C');
  };

  const settings = {
    className: "center",
    centerPadding: "60px",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
     <Row className=''>
      <Slider {...settings}>
        {canchas.map((d) => (
          <div className="card custom-card" key={d.idCancha}>
            <img src={d.foto} alt={d.descripcion} className="card-img-top" />
            <div className="card-body">
              <p className="card-text">{d.descripcion}</p>
            </div>
          </div>
        ))}
      </Slider>
    </Row>
      <Row>
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
            })} defaultValue={reserva ? reserva.fechaReserva : ''} />
            {errors.fechaReserva && <span className='error'><span className='error-icon'></span>{errors.fechaReserva.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="idCancha">Cancha:</label>
            <select className="form-control" id="idCancha" {...register("idCancha", { required: "Este campo es requerido" })} defaultValue={reserva ? reserva.idCancha : ''}>
              <option value="">Seleccione una Cancha</option>
              {canchas.map(cancha => (
                <option key={cancha.idCancha} value={cancha.idCancha}>{cancha.descripcion}</option>
              ))}
            </select>
            {errors.idCancha && <span className='error'><span className='error-icon'></span>{errors.idCancha.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="idTipoReserva">Tipo de Reserva:</label>
            <select className="form-control" id="idTipoReserva" {...register("idTipoReserva", { required: "Este campo es requerido" })} defaultValue={reserva ? reserva.idTipoReserva : ''}>
              <option value="">Seleccione un Tipo de Reserva</option>
              {tipoReservas.map(tipoReserva => (
                <option key={tipoReserva.idTipoReserva} value={tipoReserva.idTipoReserva}>{tipoReserva.descripcion}</option>
              ))}
            </select>
            {errors.idTipoReserva && <span className='error'><span className='error-icon'></span>{errors.idTipoReserva.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="idCliente">Cliente:</label>
            <select className="form-control" id="idCliente" {...register("idCliente", { required: "Este campo es requerido" })} defaultValue={reserva ? reserva.idCliente : ''}>
              <option value="">Seleccione un Cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nroDoc}</option>
              ))}
            </select>
            {errors.idCliente && <span className='error'><span className='error-icon'></span>{errors.idCliente.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="comprobante">Observacion:</label>
            <input type="text" className="form-control" id="comprobante" {...register("comprobante", { required: "Este campo es requerido" })} defaultValue={reserva ? reserva.comprobante : ''} />
            {errors.comprobante && <span className='error'><span className='error-icon'></span>{errors.comprobante.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora:</label>
            <input type="time" className="form-control" id="hora" {...register("hora", { required: "Este campo es requerido" })} defaultValue={reserva ? reserva.hora : ''} />
            {errors.hora && <span className='error'><span className='error-icon'></span>{errors.hora.message}</span>}
          </div>
          <div>
            <button type="submit" className="btn btn-primary mt-3 me-2">{reserva ? 'Actualizar' : 'Registrar'}</button>
            <button type="button" className="btn btn-danger mt-3" onClick={() => setAction('C')}>Cancelar</button>
          </div>
        </form>
      </div>
      </Row>
      
    </>

  );
}
