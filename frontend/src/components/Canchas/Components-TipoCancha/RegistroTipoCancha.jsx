import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tipoCanchaService from '../../../services/Canchas/tipoCanchas.service';

const RegistroTipoCancha = ({ setAction, loadData, cancha }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  // Efecto para setear valores del formulario
  useEffect(() => {
    if (cancha) {
      console.log('Setting form values:', cancha);
      setValue('idTipoCancha', cancha.idTipoCancha);
      setValue('descripcion', cancha.descripcion);
    }
  }, [cancha, setValue]);


  const onSubmit = async (data) => {
    try {
      if (cancha) {
        const updatedCancha = { ...cancha, ...data };
        await tipoCanchaService.updateTipocanchas(updatedCancha);
      } else {
        await tipoCanchaService.saveTipocanchas(data);
      }
      loadData();
      setAction('C');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container_app'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>{cancha ? 'Actualizar Cancha' : 'Registro de Cancha'}</h5>
        <div className="form-group">
          <label htmlFor="idCancha">ID Cancha: no Modificable</label>
          <input type="text" className="form-control" id="idCancha" readOnly {...register("idCancha")} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" className="form-control" id="descripcion" {...register("descripcion", { required: 'Este campo es requerido' })} />
          {errors.descripcion && <span className='error'>{errors.descripcion.message}</span>}
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-3 me-2">{cancha ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className="btn btn-danger mt-3" onClick={() => setAction('C')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistroTipoCancha;
