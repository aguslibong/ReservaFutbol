import axios from 'axios';

const URL = 'http://localhost:3000/api/reserva';

const getReservas = async () => {
    try {
        const res = await axios.get(URL);
        return res.data
    } catch (error) {
        console.error('Error fetching Reserva:', error);
        return [];
    }
}

const saveReservas = async (reserva) => {
    try {
        const res = await axios.post(URL, reserva, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error saving canchas:', error);
        return null;
    }
}

const deleteReservas = async (idReserva) => {
    try {
        const res = await axios.delete(`${URL}/${idReserva}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting Reserva:', error);
        return null;
    }
}

const updateReservas = async (reserva) => {
    try {
        const res = await axios.put(URL, reserva, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating Reserva:', error);
        return null;
    }
}

export default { getReservas, saveReservas, deleteReservas, updateReservas };
