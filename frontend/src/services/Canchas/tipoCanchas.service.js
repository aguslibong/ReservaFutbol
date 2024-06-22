import axios from 'axios';

const URL = 'http://localhost:3000/api/tipocancha';

const getTipocanchas = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error('Error fetching tipocanchas:', error);
        return [];
    }
}

const saveTipocanchas = async (tipocanchas) => {
    try {
        const res = await axios.post(URL, tipocanchas, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error saving tipocanchas:', error);
        return null;
    }
}

const deleteTipocanchas = async (tipocanchas) => {
    try {
        const res = await axios.delete(URL, {
            headers: { 'Content-Type': 'application/json' },
            data: tipocanchas
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting tipocanchas:', error);
        return null;
    }
}

const updateTipocanchas = async (tipocanchas) => {
    try {
        const res = await axios.put(URL, tipocanchas, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    } catch (error) {
        console.error('Error updating tipocanchas:', error);
        return null;
    }
}

export default { getTipocanchas, saveTipocanchas, deleteTipocanchas, updateTipocanchas };
