import axiosInstance from './axiosConfig';
const URL = 'http://localhost:3000/api/reserva';

const getReservas = async (idReserva = '') => {
    try {
        if (!idReserva) {
            // Si no hay idReserva, obtener todas las reservas
            const response = await axiosInstance.get(URL);
            return response.data || [];
        } else {
            // Si hay idReserva, obtener reservas filtradas por idReserva
            const response = await axiosInstance.get(`${URL}?idReserva=${idReserva}`);
            return response.data || [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const saveReservas = async (reserva) => {
    try {
        console.log("Datos que se van a enviar:", reserva);  // Agregar log aquí

        const response = await axiosInstance.post(URL, reserva);
        return response.data;
    } catch (error) {
        console.error('Error saving reserva:', error);
        return null;
    }
};

const updateReservas = async (reserva) => {
    try {
        const response = await axiosInstance.put(`${URL}/${reserva.idReserva}`, reserva);
        return response.data;
    } catch (error) {
        console.error('Error actualizando reserva:', error);
        return null;
    }
};

const deleteReservas = async (idReserva) => {
    try {
        const response = await axiosInstance.delete(`${URL}/${idReserva}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando reserva:', error);
        return null;
    }
};

export { getReservas, updateReservas, saveReservas, deleteReservas };
