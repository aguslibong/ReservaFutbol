const URL = 'http://localhost:3000/api/cancha';

const getCanchas = async() => {
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        return data;
        
    } catch (error) {
        console.error('Error fetching canchas:', error);
        return [];
    }
}

const saveCanchas = async(canchas) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(canchas)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error saving canchas:', error);
        return null;
    }
}

const deleteCanchas = async (canchas) => {
    console.log(canchas)
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(canchas)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error Elminando canchas:', error);
        return null;
    }
}

const updateCanchas = async (canchas) => {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(canchas)
        };

        const res = await fetch(URL, requestOptions);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error Elminando canchas:', error);
        return null;
    }
}



export default {getCanchas,saveCanchas,deleteCanchas,updateCanchas}