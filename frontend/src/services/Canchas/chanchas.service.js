import axios from 'axios';

const URL = 'http://localhost:3000/api/cancha';

const getCanchas = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error('Error fetching canchas:', error);
        return [];
    }
}

const saveCanchas = async (canchas) => {
    try {
        const res = await axios.post(URL, canchas, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error saving canchas:', error);
        return null;
    }
}

const deleteCanchas = async (canchas) => {
    try {
        const res = await axios.delete(URL, {
            headers: { 'Content-Type': 'application/json' },
            data: canchas
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting canchas:', error);
        return null;
    }
}

const updateCanchas = async (canchas) => {
    try {
        const res = await axios.put(URL, canchas, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating canchas:', error);
        return null;
    }
}

export default { getCanchas, saveCanchas, deleteCanchas, updateCanchas };
