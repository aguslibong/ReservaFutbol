import axiosInstance from './axiosConfig';
const URL = 'http://localhost:3000/api/tipoReserva';

const getTipoReservas = async (idTipoReserva = '') => {
    try {
        if (!idTipoReserva) {
            // Si no hay idTipoReserva, obtener todas las tipoReservas
            const response = await axiosInstance.get(URL);
            return response.data || [];
        } else {
            // Si hay idTipoReserva, obtener tipoReservas filtradas por idTipoReserva
            const response = await axiosInstance.get(`${URL}?idTipoReserva=${idTipoReserva}`);
            return response.data || [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const saveTipoReserva = async (tipoReserva) => {
    try {
        console.log("Datos que se van a enviar:", tipoReserva);  // Agregar log aquí

        const response = await axiosInstance.post(URL, tipoReserva);
        return response.data;
    } catch (error) {
        console.error('Error saving tipoReserva:', error);
        return null;
    }
};

const updateTipoReserva = async (tipoReserva) => {
    try {
        const response = await axiosInstance.put(`${URL}/${tipoReserva.idTipoReserva}`, tipoReserva);
        return response.data;
    } catch (error) {
        console.error('Error actualizando tipoReserva:', error);
        return null;
    }
};

const deleteTipoReserva = async (idTipoReserva) => {
    try {
        const response = await axiosInstance.delete(`${URL}/${idTipoReserva}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando tipoReserva:', error);
        return null;
    }
};

export { getTipoReservas, saveTipoReserva, updateTipoReserva, deleteTipoReserva };
