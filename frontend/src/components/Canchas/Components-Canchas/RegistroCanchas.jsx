import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tipoCanchasService from '../../../services/Canchas/tipoCanchas.service.js';
import canchasService from '../../../services/Canchas/canchas.service.js';

const RegistroCanchas = ({ setAction, loadData, cancha }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const [tipoCanchas, setTipoCanchas] = useState([]);

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
      console.log('Setting form values:', cancha);
      setValue('idCancha', cancha.idCancha);
      setValue('fechaMantenimiento', cancha.fechaMantenimiento);
      setValue('idTipoCancha', cancha.idTipoCancha);
      setValue('descripcion', cancha.descripcion);
      setValue('foto', cancha.foto);
    }
  }, [cancha, setValue]);


  const onSubmit = async (data) => {
    try {
      if (cancha) {
        const updatedCancha = { ...cancha, ...data };
        await canchasService.updateCanchas(updatedCancha);
      } else {
        await canchasService.saveCanchas(data);
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
          <label htmlFor="fechaMantenimiento">Fecha Mantenimiento:</label>
          <input type="date" className="form-control" id="fechaMantenimiento" {...register("fechaMantenimiento", { required: 'Este campo es requerido' })} />
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
        <div>
          <button type="submit" className="btn btn-primary mt-3 me-2">{cancha ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" className="btn btn-danger mt-3" onClick={() => setAction('C')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistroCanchas;

