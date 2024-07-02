import axios from 'axios';

const URL = 'http://localhost:3000/api/tiporeserva/tiporeserva';

const getTipoReservas = async (descripcion) => {
  try {
    if (descripcion) {
      const res = await axios.get(`${URL}?descripcion=${descripcion}`);
      return res.data;
    } else {
      const res = await axios.get(URL);
      return res.data;
    }
  } catch (error) {
    console.error('Error fetching Reserva:', error);
    return [];
  }
};

const saveTipoReservas = async (tipoReserva) => {
  try {
    const res = await axios.post(URL, tipoReserva, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error('Error saving TipoReserva:', error);
    return null;
  }
};

const updateTipoReservas = async (tipoReserva) => {
  try {
    const res = await axios.put(`${URL}/${tipoReserva.idTipoReserva}`, tipoReserva, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating TipoReserva:', error);
    return null;
  }
};

const deleteTipoReservas = async (id) => {
  try {
    const res = await axios.delete(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting TipoReserva:', error);
    return null;
  }
};

export default {
  getTipoReservas,
  saveTipoReservas,
  updateTipoReservas,
  deleteTipoReservas,
};
