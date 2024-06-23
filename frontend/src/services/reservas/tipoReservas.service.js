import axios from 'axios';

const URL = 'http://localhost:3000/api/tipoReserva';

const getTipoReservas = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error('Error fetching Reserva:', error);
        return [];
    }
}

const saveTipoReservas = async (tipoReserva) => {
    try {
        const res = await axios.post(URL, tipoReserva, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error saving canchas:', error);
        return null;
    }
}

const deleteTipoReservas = async (idTipoReserva) => {
    try {
        const res = await axios.delete(`${URL}/${idTipoReserva}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting Reserva:', error);
        return null;
    }
}


const updateTipoReservas = async (tipoReserva) => {
    try {
        const res = await axios.put(URL, tipoReserva, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating Reserva:', error);
        return null;
    }
}

export default { getTipoReservas, saveTipoReservas, deleteTipoReservas, updateTipoReservas };
