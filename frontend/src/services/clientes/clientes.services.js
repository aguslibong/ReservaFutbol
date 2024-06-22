import axios from 'axios';

const URL = 'http://localhost:3000/api/cliente';

const getClientes = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error('Error fetching canchas:', error);
        return [];
    }
}

const saveClientes = async (cliente) => {
    try {
        const res = await axios.post(URL, cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error saving canchas:', error);
        return null;
    }
}

const deleteClientes = async (cliente) => {
    try {
        const res = await axios.delete(URL, {
            headers: { 'Content-Type': 'application/json' },
            data: cliente
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting cliente:', error);
        return null;
    }
}

const updateClientes = async (cliente) => {
    try {
        const res = await axios.put(URL, cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating canchas:', error);
        return null;
    }
}

export default { getClientes, saveClientes, deleteClientes, updateClientes };
