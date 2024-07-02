import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tipoCanchasService from '../../../services/Canchas/tipoCanchas.service.js';
import canchasService from '../../../services/Canchas/canchas.service.js';
import { Modal, Button } from 'react-bootstrap';

const RegistroCanchas = ({ setAction, loadData, cancha }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const [tipoCanchas, setTipoCanchas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  // Efecto para obtener tipos de canchas
  useEffect(() => {
    const fetchTipoCanchas = async () => {
      try {
        const response = await tipoCanchasService.getTipocanchas();
        setTipoCanchas(response);
      } catch (error) {
        console.error('Error fetching tipoCanchas:', error);
      }
    };
    fetchTipoCanchas();
  }, []);

  // Efecto para setear valores del formulario
  useEffect(() => {
    if (cancha) {
      setValue('fechaMantenimiento', cancha.fechaMantenimiento);
      setValue('idTipoCancha', cancha.idTipoCancha);
      setValue('descripcion', cancha.descripcion);
      setValue('foto', cancha.foto);
      setValue('activo', cancha.activo)
    }
  }, [cancha, setValue]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const onSubmit = async () => {
    try {
      if (cancha) {
        const updatedCancha = { ...cancha, ...formData };
        await canchasService.updateCanchas(updatedCancha);
      } else {
        await canchasService.saveCanchas(formData);
      }
      loadData();
      setAction('C');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container_app'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h5>{cancha ? 'Actualizar Cancha' : 'Registro de Cancha'}</h5>
        <div className="form-group">
          <label htmlFor="fechaMantenimiento">Fecha Mantenimiento:</label>
          <input type="date" className="form-control" id="fechaMantenimiento" {...register("fechaMantenimiento", { 
            required: 'Este campo es requerido',
            validate: value => {
              const selectedDate = new Date(value);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00 para comparar solo la fecha
              return selectedDate <= currentDate || 'La fecha no puede ser mayor que el día de hoy';
            }
          })} />
          {errors.fechaMantenimiento && <span className='error'>{errors.fechaMantenimiento.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="idTipoCancha">Tipo Cancha:</label>
          <select className="form-control" id="idTipoCancha" {...register("idTipoCancha", { required: 'Este campo es requerido' })}>
            <option value="">Seleccione una opción</option>
            {tipoCanchas.map(tc => (
              <option key={tc.idTipoCancha} value={tc.idTipoCancha}>{tc.descripcion}</option>
            ))}
          </select>
          {errors.idTipoCancha && <span className='error'>{errors.idTipoCancha.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" className="form-control" id="descripcion" {...register("descripcion", { required: 'Este campo es requerido' })} />
          {errors.descripcion && <span className='error'>{errors.descripcion.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input type="text" className="form-control" id="foto" {...register("foto")} />
          {errors.foto && <span className='error'>{errors.foto.message}</span>}
        </div>
        
        {cancha && (
          <div className="form-group">
            <label htmlFor="activo">Condición:</label>
            <select className="form-control" id="activo" {...register("activo", { required: 'Este campo es requerido' })}>
              <option value="">Seleccione una opción</option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
            {errors.activo && <span className='error'>{errors.activo.message}</span>}
          </div>
        )}
        
        <div>
          <button type="submit" className="btn btn-primary mt-3 me-2">{cancha ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className="btn btn-danger mt-3" onClick={() => setAction('C')}>Cancelar</button>
        </div>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea Registrar la Cancha?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={onSubmit}>Sí</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistroCanchas;

